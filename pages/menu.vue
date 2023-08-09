<template>
  <section>
    <div class="flex items-center justify-between md:my-8">
      <!-- Page's Title -->
      <div class="flex flex-col gap-y-4">
        <h2 class="text-xl md:text-4xl font-semibold">Menu</h2>
        <span class="text-xs font-medium"
          >Terdapat {{ data.length }} menu yang tersedia.</span
        >
      </div>

      <MenuModal />
    </div>

    <Table
      :data="data"
      :pending="pending"
      :postsPerPage="postsPerPage"
      @page-changed="refetch"
    >
      <div v-for="(item, index) in paginatedItems" :key="index">
        <NuxtLink
          :to="{ name: 'MenuDetails', params: { id: item.id } }"
          class="flex items-center font-bold justify-between px-8 py-7 mb-4 rounded-xl w-full bg-slate-100 dark:bg-gray-800/90 dark:text-white"
        >
          <div class="flex basis-3/5 gap-x-4 items-center text-sm">
            <span class="flex-1">#{{ item.id.substring(0, 6) }}</span>
            <span class="flex-1">Stok: {{ item.stock }}</span>
            <span class="flex-1 font-medium capitalize">{{ item.name }}</span>
          </div>

          <div class="flex items-center gap-x-4 basis-2/5 text-sm">
            <span class="flex-1 font-semibold text-lg"
              >Rp.
              {{
                item.harga.toLocaleString('id-ID', {
                  style: 'decimal',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              }}</span
            >

            <div
              class="w-32 inline-flex justify-center items-center gap-x-2 py-1.5 rounded-md"
            >
              <UIcon
                :name="
                  item.kategori.nama_kategori === 'Paypal'
                    ? 'i-logos-paypal'
                    : false
                "
              />
              <span class="text-sm font-semibold">{{
                item.kategori.nama_kategori
              }}</span>
            </div>

            <UIcon name="i-ic-round-chevron-right" />
          </div>
        </NuxtLink>
      </div>
    </Table>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth',
  name: 'Menu',
});

useHead({
  title: 'List of Menu Page',
});

const supabase = useSupabaseClient();
const currentPage = ref(1);
const postsPerPage = ref(5);
const data = ref([]);

const { data: menu, error } = await supabase
  .from('menu')
  .select('id, name, stock, harga, kategori:kategori_id(nama_kategori)')
  .order('created_at', { ascending: false });

if (error) throw error;
data.value = menu;

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage.value;
  const endIndex = startIndex + postsPerPage.value;
  return data.value.slice(startIndex, endIndex);
});

const refetch = async (pageNumber) => {
  currentPage.value = pageNumber;
  const { data: selling, error } = await useFetch('/api/menu/menus', {
    key: `invoices-${currentPage.value}`,
    params: {
      page: pageNumber,
      postsPerPage: postsPerPage.value,
    },
  });

  if (error) throw error;

  data.value = selling.value;
};
</script>
