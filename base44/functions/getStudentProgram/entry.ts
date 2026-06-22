import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Public endpoint — students are NOT logged in as admin.
// We validate the access code is a known member code, then fetch via service role.
const MEMBER_CODES = [
  'HENRY173','HAEJUN142','ANDREAS189','TANUSH157','RYAN128','JULIAN194',
  'MACK136','MARCUS181','ALISTAIR149','JAYDEN165','LUKE121','GAON176',
  'SEAN138','DANIEL192','MATHEW154','HAYDEN167','HUGO144','CEDRICK185','LENNON184',
];
const ADMIN_CODE = 'BTCALI999';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { access_code } = await req.json();

    if (!access_code) {
      return Response.json({ error: 'access_code required' }, { status: 400 });
    }

    const code = access_code.trim().toUpperCase();

    // Validate: must be a known code (prevents arbitrary DB queries)
    const isAdmin = code === ADMIN_CODE;
    const isMember = MEMBER_CODES.includes(code);

    if (!isAdmin && !isMember) {
      return Response.json({ error: 'Invalid access code' }, { status: 403 });
    }

    // Use service role to bypass RLS
    const results = await base44.asServiceRole.entities.StudentProgram.filter({ access_code: code });
    const program = results[0] || null;

    return Response.json({ program });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});