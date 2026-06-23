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
    if (!user) return Response.json({ account: null }, { status: 200, headers: corsHeaders });

    const accounts = await base44.asServiceRole.entities.MemberAccount.filter({ user_email: user.email });
    const account = accounts[0] || null;

    // If admin email check
    const isAdmin = user.role === 'admin';

    return Response.json({ account, is_admin: isAdmin }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('getMemberAccount error:', error.message);
    return Response.json({ account: null, is_admin: false }, { status: 200, headers: corsHeaders });
  }
});