<template>
  <main class="container max-w-xl mx-auto mt-24 px-6">
    <section>
      <div class="flex flex-col">
        <div class="dark:bg-gray-800 shadow-md rounded-3xl p-4">
          <div class="flex-none lg:flex">
            <div class="h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
              <img
                src="~/assets/img/diet.png"
                alt="menu foto"
                class="w-full object-scale-down lg:object-cover lg:h-48 rounded-2xl"
              />
            </div>
            <div class="flex-auto ml-3 justify-evenly py-2">
              <div class="flex flex-wrap">
                <div class="w-full flex-none text-xs text-blue-700 font-medium">
                  {{ data.kategori.nama_kategori }}
                </div>
                <h2 class="flex-auto text-2xl font-bold capitalize">
                  {{ data.name }}
                </h2>
              </div>
              <p class="mt-3"></p>
              <div class="flex py-4 text-sm">
                <div class="flex-1 inline-flex items-center text-gray-500">
                  <p>
                    Stock:
                    <span class="font-bold">{{ data.stock }} </span>&nbsp;{{
                      data.satuan.unit_name
                    }}
                  </p>
                </div>
                <div class="flex-1 inline-flex items-center">
                  <p class="text-xl font-semibold">
                    Rp. {{ data.harga.toLocaleString('id-ID', options) }}
                  </p>
                </div>
              </div>
              <div v-if="user.email === 'auliamedina25@gmail.com'">
                <div class="flex p-4 pb-2 border-t border-gray-200"></div>
                <div class="flex gap-x-2 justify-between text-sm font-medium">
                  <UpdateMenuModal :data="data" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
  middleware: 'auth',
  layout: 'default',
  name: 'MenuDetails',
});

useHead({
  title: 'Edit Menu Page',
});
const user = useSupabaseUser();
const { id } = useRoute().params;
const options = {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};
const { data, error } = await useFetch(`/api/menu/${id}`);
</script>
