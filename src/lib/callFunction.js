/**
 * Calls a Base44 backend function directly via the canonical API URL.
 * Hardcodes the app ID to avoid any localStorage/env-var caching issues on custom domains.
 * Always sends the user's auth token so backend functions can identify the caller.
 */

const APP_ID = '69fd635623a9368c153045ad';

function getToken() {
  try {
    return localStorage.getItem('base44_access_token') || localStorage.getItem('token') || '';
  } catch {
    return '';
  }
}

export async function callFunction(functionName, payload) {
  const url = `https://base44.app/api/apps/${APP_ID}/functions/${functionName}`;
  const token = getToken();

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Function ${functionName} returned ${res.status}: ${text}`);
  }

  return res.json();
}