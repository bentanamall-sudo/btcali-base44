import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v6 — 2026-06-24 ──
// All previous codes (v1–v5) are permanently disabled.
// New XXXX-XXXX-XXXX-XXXX format codes only.

const ADMIN_CODE = 'BTCALI-ADMIN-V6-QX9M3RKPTZ';

const VALID_CODES = {
  'Q7MX-9TWP-K2VR-H8NC': 'Henry',
  'R4ZD-W8KY-M7QP-T2XF': 'Haejun',
  'N9VC-H3TR-P8KM-W6QJ': 'Andeas',
  'T5BW-X2NR-G9KH-P4MV': 'Tanush',
  'K8HN-M4VQ-W3XR-B7TZ': 'Ryan',
  'W2PZ-T6BN-H9MX-C5KR': 'Julian',
  'X4KR-N8WZ-T3VH-M6PB': 'Mack',
  'B6TH-P3MX-N7KW-R9VZ': 'Marcus',
  'C9WV-K5TR-B2NX-H8MQ': 'Alistair',
  'H3MZ-B7NV-P4KT-W6XR': 'Jayden',
  'P5XN-W9KZ-R6BM-T3VH': 'Luke',
  'V7KT-R2MH-X5NB-P9WZ': 'Gaon',
  'M4NR-H8VX-B6KZ-W2PT': 'Sean',
  'Z6BW-P4NK-M9XH-T7RV': 'Daniel',
  'G8VX-T5RN-K3WB-H6MZ': 'Mathew',
  'F3KH-W7MV-N2XR-B5TZ': 'Hayden',
  'J9MT-B4WX-P7KN-R3VH': 'Hugo',
  'L2XR-N6TH-W8VM-K4BZ': 'Cedrick',
  'Y7WB-K3XN-T9VH-M5RZ': 'Lennon',
};

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
      return Response.json({ valid: false, error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
    }

    const { access_code } = body;
    if (!access_code || typeof access_code !== 'string') {
      return Response.json({ valid: false, error: 'Please enter your access code.' }, { status: 200, headers: corsHeaders });
    }

    const code = access_code.trim().toUpperCase();
    if (!code) {
      return Response.json({ valid: false, error: 'Please enter your access code.' }, { status: 200, headers: corsHeaders });
    }

    if (code === ADMIN_CODE) {
      return Response.json({ valid: true, isAdmin: true, studentName: 'Admin' }, { status: 200, headers: corsHeaders });
    }

    if (VALID_CODES[code]) {
      return Response.json({ valid: true, isAdmin: false, studentName: VALID_CODES[code] }, { status: 200, headers: corsHeaders });
    }

    // Legacy codes get a clear message
    return Response.json({
      valid: false,
      error: 'Invalid access code. If you had a previous code, please contact BTCALI for your new v6 code.',
    }, { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('validateAccessCode error:', error.message);
    return Response.json({ valid: false, error: 'Server error. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});