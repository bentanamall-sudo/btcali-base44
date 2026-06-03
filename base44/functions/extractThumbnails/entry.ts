import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const VIDEOS = [
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/30726ddef_C2235DA5-CFA6-4B66-A712-1CFD414AEE34.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/ab40f3e73_3DBD7B8B-0985-4366-803A-6BF5FE6E16DA.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/d03b8e901_87AA93C8-C62D-44CB-92B4-25DE7D6EB9EF.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/33e465fb1_8FB2940B-72DC-4171-B5BD-3B262CA0230A.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/9bce54fa0_F8C3EC32-6F28-43F9-9274-5DCA2E4AD3AE.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/b29797e50_C52B9D44-CCC6-4C11-B563-D29E72D5E742.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/a7025db1d_C88E406D-F072-4021-9F9D-376E1AE850BA.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/acb324d63_D9DC1424-7087-4C6F-BC4C-83A843896E19.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7c2816870_BF734FD2-A5B6-4EA6-9DFC-3725ABB1BAAD.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a0d49733_D05272AD-F171-4C80-8119-90847BFEFB36.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/bb51770b0_61F09AF3-D0FC-44CC-8EC6-6037B4540D78.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/7da5945e5_2882F251-A505-4D09-9090-44FCD8DAEDB4.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/3a47f6089_5DDF0CFF-6FD2-432E-B713-A609FBBD691A.mp4',
  'https://media.base44.com/videos/public/69fd635623a9368c153045ad/8062fad09_5fed1466edd6499c94832fcfc468d25c.mov',
];

// Extract first frame from video using ffmpeg via Deno subprocess
async function extractFrame(videoUrl, index) {
  const tmpInput = `/tmp/video_${index}.mp4`;
  const tmpOutput = `/tmp/thumb_${index}.jpg`;

  // Download the video (first 2MB only using range header for speed)
  const res = await fetch(videoUrl, {
    headers: { Range: 'bytes=0-2097151' }
  });
  const buffer = await res.arrayBuffer();
  await Deno.mkdir('/tmp', { recursive: true });
  await Deno.writeFile(tmpInput, new Uint8Array(buffer));

  // Run ffmpeg to extract first frame
  const cmd = new Deno.Command('ffmpeg', {
    args: [
      '-y',
      '-i', tmpInput,
      '-vframes', '1',
      '-vf', 'scale=270:480',
      '-q:v', '5',
      tmpOutput
    ],
    stdout: 'null',
    stderr: 'null',
  });

  const { code } = await cmd.output();
  if (code !== 0) throw new Error(`ffmpeg failed for video ${index}`);

  const imgData = await Deno.readFile(tmpOutput);
  
  // Cleanup
  await Deno.remove(tmpInput).catch(() => {});
  await Deno.remove(tmpOutput).catch(() => {});

  return imgData;
}

// Upload extracted frame to base44 storage
async function extractAndUpload(videoUrl, index, base44) {
  const imgData = await extractFrame(videoUrl, index);
  const blob = new Blob([imgData], { type: 'image/jpeg' });
  const { file_url } = await base44.asServiceRole.integrations.Core.UploadFile({ file: blob });
  return file_url;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const index = body.index ?? null;

    if (index !== null) {
      // Extract single video thumbnail
      const url = await extractAndUpload(VIDEOS[index], index, base44);
      return Response.json({ index, url });
    }

    // Extract all thumbnails sequentially (to avoid memory pressure)
    const results = [];
    for (let i = 0; i < VIDEOS.length; i++) {
      const url = await extractAndUpload(VIDEOS[i], i, base44);
      results.push({ index: i, url });
      console.log(`Extracted thumbnail ${i + 1}/${VIDEOS.length}`);
    }

    return Response.json({ thumbnails: results });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});