import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders });

    let body;
    try { body = await req.json(); } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400, headers: corsHeaders });
    }

    const { program_id, tabs } = body;
    if (!program_id || !Array.isArray(tabs)) {
      return Response.json({ error: 'program_id and tabs are required' }, { status: 400, headers: corsHeaders });
    }

    await base44.asServiceRole.entities.StudentProgram.update(program_id, { tabs });

    return Response.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('updateStudentProgram error:', error.message);
    return Response.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
});