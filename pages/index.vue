<template>
  <section>
    <div class="flex items-center justify-between md:my-8">
      <!-- Page's Title -->
      <div class="flex flex-col gap-y-4">
        <h2 class="text-xl md:text-4xl font-semibold">Nota</h2>
        <span class="text-xs font-medium"
          >Terdapat {{ data.length }} nota yang tersimpan.</span
        >
      </div>

      <div class="flex items-center justify-center gap-x-4">
        <USelectMenu
          v-model="selected"
          :options="invoiceTypes"
          placeholder="Filter by status"
          variant="none"
        />

        <UButton
          label="New Invoice"
          :ui="{ rounded: 'rounded-full' }"
          size="lg"
          icon="i-mdi-plus-circle"
          @click="authStore.isOpen = !authStore.isOpen"
        />
      </div>
    </div>

    <Table
      :selling="data"
      :pending="pending"
      :postsPerPage="postsPerPage"
      @page-changed="refetch"
    />
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'default',
  name: 'Home',
});

useHead({
  title: 'Invoice App',
});

import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const supabase = useSupabaseClient();

const invoiceTypes = ['Cash', 'Credit Card', 'Debit Card', 'Paypal'];
const selected = ref(invoiceTypes[0]);
const currentPage = ref(1);
const postsPerPage = ref(5);
const data = ref([]);
const pending = ref(false);

const { data: selling, error } = await supabase
  .from('selling')
  .select('*')
  .order('created_at', { ascending: false });

if (error) throw error;
data.value = selling;

const refetch = async (pageNumber) => {
  currentPage.value = pageNumber;
  const {
    data: selling,
    pending: loading,
    error,
  } = await useFetch('/api/invoices/invoices', {
    key: `invoices-${currentPage.value}`,
    params: {
      page: pageNumber,
      postsPerPage: postsPerPage.value,
    },
  });

  if (error) throw error;

  data.value = selling.value;
  pending.value = loading.value;
};
</script>
