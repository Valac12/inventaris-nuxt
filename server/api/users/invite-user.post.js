import { serverSupabaseServiceRole } from '#supabase/server';

export default eventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const { email } = readBody(event);

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

  if (error) throw error;

  return data;
});
