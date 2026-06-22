/**
 * Calls a Base44 backend function directly via the canonical API URL.
 * Bypasses the SDK's functionsVersion header (which can be "preview" on live site)
 * to ensure production functions are always called correctly.
 */

const APP_ID = import.meta.env.VITE_BASE44_APP_ID;
const BASE_URL = 'https://base44.app';

export async function callFunction(functionName, payload) {
  const url = `${BASE_URL}/api/apps/${APP_ID}/functions/${functionName}`;

  console.log(`[callFunction] POST ${url}`, payload);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-App-Id': APP_ID,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Function ${functionName} returned ${res.status}: ${text}`);
  }

  return res.json();
}