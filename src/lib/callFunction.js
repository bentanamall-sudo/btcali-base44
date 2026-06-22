/**
 * Calls a Base44 backend function directly via the canonical API URL.
 * Hardcodes the app ID to avoid any localStorage/env-var caching issues on custom domains.
 * Never sends a functions-version header, so it always hits the production deployment.
 */

const APP_ID = '69fd635623a9368c153045ad';

export async function callFunction(functionName, payload) {
  const url = `https://base44.app/api/apps/${APP_ID}/functions/${functionName}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Function ${functionName} returned ${res.status}: ${text}`);
  }

  return res.json();
}