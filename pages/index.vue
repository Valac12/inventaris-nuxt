<template>
  <section>
    <div class="flex items-center justify-between md:my-8">
      <!-- Page's Title -->
      <div class="flex flex-col gap-y-4">
        <h2 class="text-xl md:text-4xl font-semibold">Nota</h2>
        <span class="text-xs font-medium">Terdapat total 2 nota</span>
      </div>

      <div class="flex items-center justify-center gap-x-4">
        <USelectMenu
          v-model="selected"
          :options="invoiceTypes"
          placeholder="Filter by status"
          variant="none"
          :loading="loading"
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

    <Table />
  </section>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'default',
});

useHead({
  title: 'Invoice App',
});

import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const invoiceTypes = ['Pending', 'Paid', 'Draft'];

const selected = ref(invoiceTypes[0]);
const loading = ref(false);
</script>
