import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
    .from('menu')
    .select(
      '*, satuan:satuan_id(unit_name), kategori:kategori_id(nama_kategori)'
    )
    .order('created_at', { ascending: false })
    .eq('id', event.context.params.id)
    .single();

  if (error) throw error;

  return data;
});
