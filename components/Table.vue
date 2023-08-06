<template>
  <ClientOnly>
    <div v-if="props.selling.length > 0">
      <div v-for="(item, index) in paginatedItems" :key="index">
        <NuxtLink
          :to="{ name: 'InvoiceDetails', params: { id: item.id } }"
          class="flex items-center font-bold justify-between px-8 py-7 mb-4 rounded-xl w-full bg-slate-100 dark:bg-gray-800/90 dark:text-white"
        >
          <TableRow :data="item" />
        </NuxtLink>
      </div>

      <UPagination
        v-model="currentPage"
        @update:model-value="$emit('page-changed', currentPage)"
        :page-count="props.postsPerPage"
        :total="props.selling.length"
        :max="5"
        :ui="{
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
        }"
      >
        <template #prev>
          <UTooltip text="Previous page">
            <UButton
              icon="i-heroicons-arrow-small-left-20-solid"
              color="gray"
              class="rtl:[&_span:first-child]:rotate-180 me-2"
              @click="prevPage"
              :disabled="currentPage === 1"
            />
          </UTooltip>
        </template>

        <template #next>
          <UTooltip text="Next page">
            <UButton
              icon="i-heroicons-arrow-small-right-20-solid"
              color="gray"
              class="rtl:[&_span:last-child]:rotate-180 ms-2"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            />
          </UTooltip>
        </template>
      </UPagination>
    </div>

    <div class="flex flex-col gap-y-8" v-else>
      <img
        src="~/assets/img/search.svg"
        alt="not found"
        class="w-80 h-80 mx-auto"
      />
      <span class="text-3xl font-semibold mx-auto text-gray-600"
        >Tidak ada nota transaksi yang terekam.</span
      >
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps(['postsPerPage', 'selling', 'pending']);
const emit = defineEmits(['page-changed', 'prev-page', 'next-page']);
const currentPage = ref(1); // current page number, starts from one (1).

const prevPage = () => {
  if (currentPage.value > 1) {
    emit('page-changed', currentPage.value--);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    emit('page-changed', currentPage.value++);
  }
};

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * props.postsPerPage;
  const endIndex = startIndex + props.postsPerPage;
  return props.selling.slice(startIndex, endIndex);
});

const totalPages = computed(() =>
  Math.ceil(props.selling.length / props.postsPerPage)
);
</script>
