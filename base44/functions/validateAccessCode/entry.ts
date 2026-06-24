import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// ── SECURITY RESET v5 — 2026-06-24 ──
// All previous codes (v1–v4) are permanently disabled below.
// Only the new v5 codes are valid.

const ADMIN_CODE = 'BTCALI-ADMIN-V5-8KX3M9PQZR';

const VALID_CODES = {
  'H7X-4KQ2-9RNVJW': 'Henry',
  'A3M-8PF5-2WKXTZ': 'Haejun',
  'B9T-6LN1-5MQVRX': 'Andeas',
  'C2R-7VK4-8PJFNW': 'Tanush',
  'D5N-3WM9-6TXKQR': 'Ryan',
  'E8K-2PV7-4RNLFX': 'Julian',
  'F4J-9TX3-7WMNKR': 'Mack',
  'G6W-5KN8-3PVJXT': 'Marcus',
  'J1P-4MX6-9TNWKR': 'Alistair',
  'K3V-8RN2-5XJWMQ': 'Jayden',
  'L9X-7KT5-2NRWPJ': 'Luke',
  'M2N-3PW8-6XKVRT': 'Gaon',
  'N5T-6XM1-4WJKRP': 'Sean',
  'P7R-2NV4-9KMWXT': 'Daniel',
  'Q4K-9WX7-3TNRJM': 'Mathew',
  'R6M-5JN3-8VXKTW': 'Hayden',
  'S8W-1KP6-4XMNJR': 'Hugo',
  'T3X-7NR2-9JWKMV': 'Cedrick',
  'U1J-4MK8-6RVXNW': 'Lennon',
};

// ALL previously issued codes — permanently revoked
const DISABLED_CODES = new Set([
  // v1 original codes
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128',
  'JULIAN194','MACK136','MARCUS181','ALISTAIR149','JAYDEN165',
  'LUKE121','GAON176','SEAN138','DANIEL192','MATHEW154',
  'HAYDEN167','HUGO144','CEDRICK185','LENNON184','BTCALI999',
  // v2 codes
  'HENRY-X7K91P','HAEJUN-M4R82Q','ANDEAS-T9V61L','TANUSH-P3N74X',
  'RYAN-V5J38W','JULIAN-W6H93R','MACK-F2T81Z','MARCUS-L7P64N',
  'ALISTAIR-D5X29K','JAYDEN-R8M41V','LUKE-B9Q73T','GAON-H4K86P',
  'SEAN-Z2N58L','DANIEL-Y7R34M','MATHEW-C8P61Q','HAYDEN-J5V92T',
  'HUGO-N4T87X','CEDRICK-Q6L53R','LENNON-X9M72K',
  'BTCALI-ADMIN-84X7P',
  // v3 codes
  'RYAN-K8Q52M',
  // v4 codes — REVOKED in this reset
  'HENRY-Q8M47Z','HAEJUN-L3X92V','ANDEAS-P6T81K','TANUSH-V9R24M',
  'RYAN-N5C73Q','JULIAN-K2W68P','MACK-Z7H31L','MARCUS-T4N95X',
  'ALISTAIR-B8Q52R','JAYDEN-X6P19V','LUKE-M3Z84K','GAON-R7L26T',
  'SEAN-W9C45N','DANIEL-H2V68Q','MATHEW-K5X93L','HAYDEN-P8M41Z',
  'HUGO-C6T72R','CEDRICK-L9N35V','LENNON-Z4Q86P',
  'BTCALI-ADMIN-P7X92M',
  // v4 test codes
  'TEST-PAGE-1','TEST-PAGE-2','TEST-PAGE-3','TEST-PAGE-4','TEST-PAGE-5',
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

    // Revoked codes get a clear message
    if (DISABLED_CODES.has(code)) {
      return Response.json({
        valid: false,
        error: 'This code has been revoked as part of a security reset. Contact BTCALI to receive your new access code.',
      }, { status: 200, headers: corsHeaders });
    }

    if (code === ADMIN_CODE) {
      return Response.json({ valid: true, isAdmin: true, studentName: 'Admin' }, { status: 200, headers: corsHeaders });
    }

    if (VALID_CODES[code]) {
      return Response.json({ valid: true, isAdmin: false, studentName: VALID_CODES[code] }, { status: 200, headers: corsHeaders });
    }

    return Response.json({ valid: false, error: 'Invalid access code. Check your code and try again.' }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('validateAccessCode error:', error.message);
    return Response.json({ valid: false, error: 'Server error. Please try again.' }, { status: 500, headers: corsHeaders });
  }
});