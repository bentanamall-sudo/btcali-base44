import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Known valid access codes — prevents arbitrary DB queries
const MEMBER_CODES = new Set([
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128','JULIAN194',
  'MACK136','MARCUS181','ALISTAIR149','JAYDEN165','LUKE121','GAON176',
  'SEAN138','DANIEL192','MATHEW154','HAYDEN167','HUGO144','CEDRICK185','LENNON184',
  'BTCALI999', // admin
]);

Deno.serve(async (req) => {
  // CORS for live site
  const origin = req.headers.get('origin') || '';
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let body;
    try {
      body = await req.json();
    } catch {
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

    // Use service role (bypasses RLS — admin-only restriction on StudentProgram)
    const base44 = createClientFromRequest(req);
    const results = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const program = results[0] || null;

    return Response.json({ program }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getStudentProgram error:', error.message);
    return Response.json({ error: error.message, program: null }, { status: 200, headers: corsHeaders });
  }
});