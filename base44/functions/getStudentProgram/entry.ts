import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// New secure member codes
const MEMBER_CODES = new Set([
  'HENRY-X7K91P',
  'HAEJUN-M4R82Q',
  'ANDEAS-T9V61L',
  'TANUSH-P3N74X',
  'RYAN-K8Q52M',
  'JULIAN-W6H93R',
  'MACK-F2T81Z',
  'MARCUS-L7P64N',
  'ALISTAIR-D5X29K',
  'JAYDEN-R8M41V',
  'LUKE-B9Q73T',
  'GAON-H4K86P',
  'SEAN-Z2N58L',
  'DANIEL-Y7R34M',
  'MATHEW-C8P61Q',
  'HAYDEN-J5V92T',
  'HUGO-N4T87X',
  'CEDRICK-Q6L53R',
  'LENNON-X9M72K',
  'BTCALI-ADMIN-84X7P',
]);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
    }

    const { access_code } = body;

    if (!access_code || typeof access_code !== 'string') {
      return Response.json({ error: 'access_code required' }, { status: 400, headers: corsHeaders });
    }

    const code = access_code.trim().toUpperCase();

    if (!MEMBER_CODES.has(code)) {
      return Response.json({ error: 'Invalid access code', program: null }, { status: 200, headers: corsHeaders });
    }

    const base44 = createClientFromRequest(req);
    const results = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const program = results[0] || null;

    return Response.json({ program }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getStudentProgram error:', error.message);
    return Response.json({ error: error.message, program: null }, { status: 200, headers: corsHeaders });
  }
});