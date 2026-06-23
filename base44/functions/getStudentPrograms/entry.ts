import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Admin-only endpoint: returns all student programs using service role (bypasses RLS)
const ADMIN_CODE = 'BTCALI-ADMIN-84X7P';

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

    const { admin_code } = body;
    // Accept both old and new admin codes during transition
    const isAdmin = admin_code && (
      admin_code.trim().toUpperCase() === ADMIN_CODE ||
      admin_code.trim().toUpperCase() === 'BTCALI999'
    );

    if (!isAdmin) {
      return Response.json({ error: 'Unauthorized', students: [] }, { status: 200, headers: corsHeaders });
    }

    const base44 = createClientFromRequest(req);
    const students = await base44.asServiceRole.entities.StudentProgram.list('-student_name', 100);

    return Response.json({ students }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getStudentPrograms error:', error.message);
    return Response.json({ error: error.message, students: [] }, { status: 200, headers: corsHeaders });
  }
});