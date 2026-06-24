import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// All valid codes live ONLY here — never exposed to frontend
const ADMIN_CODE = 'BTCALI-ADMIN-P7X92M';

const VALID_CODES = {
  'HENRY-Q8M47Z':    'Henry',
  'HAEJUN-L3X92V':   'Haejun',
  'ANDEAS-P6T81K':   'Andeas',
  'TANUSH-V9R24M':   'Tanush',
  'RYAN-N5C73Q':     'Ryan',
  'JULIAN-K2W68P':   'Julian',
  'MACK-Z7H31L':     'Mack',
  'MARCUS-T4N95X':   'Marcus',
  'ALISTAIR-B8Q52R': 'Alistair',
  'JAYDEN-X6P19V':   'Jayden',
  'LUKE-M3Z84K':     'Luke',
  'GAON-R7L26T':     'Gaon',
  'SEAN-W9C45N':     'Sean',
  'DANIEL-H2V68Q':   'Daniel',
  'MATHEW-K5X93L':   'Mathew',
  'HAYDEN-P8M41Z':   'Hayden',
  'HUGO-C6T72R':     'Hugo',
  'CEDRICK-L9N35V':  'Cedrick',
  'LENNON-Z4Q86P':   'Lennon',
  // Test codes
  'TEST-PAGE-1': 'Test User 1',
  'TEST-PAGE-2': 'Test User 2',
  'TEST-PAGE-3': 'Test User 3',
  'TEST-PAGE-4': 'Test User 4',
  'TEST-PAGE-5': 'Test User 5',
};

// All permanently disabled codes — checked first
const DISABLED_CODES = new Set([
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128',
  'JULIAN194','MACK136','MARCUS181','ALISTAIR149','JAYDEN165',
  'LUKE121','GAON176','SEAN138','DANIEL192','MATHEW154',
  'HAYDEN167','HUGO144','CEDRICK185','LENNON184','BTCALI999',
  'RYAN-K8Q52M',
  'HENRY-X7K91P','HAEJUN-M4R82Q','ANDEAS-T9V61L','TANUSH-P3N74X',
  'RYAN-V5J38W','JULIAN-W6H93R','MACK-F2T81Z','MARCUS-L7P64N',
  'ALISTAIR-D5X29K','JAYDEN-R8M41V','LUKE-B9Q73T','GAON-H4K86P',
  'SEAN-Z2N58L','DANIEL-Y7R34M','MATHEW-C8P61Q','HAYDEN-J5V92T',
  'HUGO-N4T87X','CEDRICK-Q6L53R','LENNON-X9M72K',
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
      return Response.json({ valid: false, error: 'Please enter your access code.' }, { status: 200, headers: corsHeaders });
    }

    const code = access_code.trim().toUpperCase();

    if (!code) {
      return Response.json({ valid: false, error: 'Please enter your access code.' }, { status: 200, headers: corsHeaders });
    }

    if (DISABLED_CODES.has(code)) {
      return Response.json({ valid: false, error: 'This code is no longer valid. Contact BTCALI for your new code.' }, { status: 200, headers: corsHeaders });
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