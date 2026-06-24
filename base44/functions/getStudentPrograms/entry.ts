import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Admin-only endpoint — uses Base44 role auth, no code needed
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
    if (!user) return Response.json({ error: 'Unauthorized', students: [] }, { status: 401, headers: corsHeaders });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden', students: [] }, { status: 403, headers: corsHeaders });

    const students = await base44.asServiceRole.entities.StudentProgram.list('-student_name', 100);
    return Response.json({ students }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getStudentPrograms error:', error.message);
    return Response.json({ error: error.message, students: [] }, { status: 200, headers: corsHeaders });
  }
});