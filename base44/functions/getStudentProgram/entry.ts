import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Valid codes list — backend only, never exposed to frontend
const VALID_CODES = new Set([
  'HENRY-Q8M47Z',
  'HAEJUN-L3X92V',
  'ANDEAS-P6T81K',
  'TANUSH-V9R24M',
  'RYAN-N5C73Q',
  'JULIAN-K2W68P',
  'MACK-Z7H31L',
  'MARCUS-T4N95X',
  'ALISTAIR-B8Q52R',
  'JAYDEN-X6P19V',
  'LUKE-M3Z84K',
  'GAON-R7L26T',
  'SEAN-W9C45N',
  'DANIEL-H2V68Q',
  'MATHEW-K5X93L',
  'HAYDEN-P8M41Z',
  'HUGO-C6T72R',
  'CEDRICK-L9N35V',
  'LENNON-Z4Q86P',
  'BTCALI-ADMIN-P7X92M',
  'TEST-PAGE-1',
  'TEST-PAGE-2',
  'TEST-PAGE-3',
  'TEST-PAGE-4',
  'TEST-PAGE-5',
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

    if (!VALID_CODES.has(code)) {
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