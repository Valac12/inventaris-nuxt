<template>
  <main class="container max-w-sm mx-auto mt-24 px-6">
    <section>
      <article
        class="rounded-xl dark:bg-gray-900 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
      >
        <div>
          <div class="relative flex items-end overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Hotel Photo"
            />
            <div
              class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
              v-if="user.email === 'auliamedina25@gmail.com'"
            >
              <UpdateMenuModal :data="data" />
            </div>
          </div>

          <div class="mt-1 p-2">
            <h2 class="capitalize text-lg font-semibold">
              {{ data.name }}
            </h2>
            <p class="mt-1 text-sm text-slate-400">
              {{ data.kategori.nama_kategori }}
            </p>
            <p class="text-sm font-normal text-gray-500">
              stock: <span class="font-semibold">{{ data.stock }}</span>
            </p>
            <div class="mt-3 flex items-end justify-between">
              <p class="text-lg font-bold text-violet-500">
                Rp. {{ data.harga.toLocaleString('id-ID', options) }}
              </p>

              <div
                class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
                v-if="user.email === 'auliamedina25@gmail.com'"
              >
                <UpdateMenuModal :data="data" />
              </div>
            </div>
          </div>
        </div>
      </article>
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
