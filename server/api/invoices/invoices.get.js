import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { page, postsPerPage } = getQuery(event);

  const { data } = await client
    .from('selling')
    .select('*')
    .order('created_at', { ascending: false })
    .range((page - 1) * postsPerPage, page * postsPerPage - 1);

  return data;
});
