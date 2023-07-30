<template>
  <section>
    <div class="w-full mb-4">
      <NuxtLink to="/" class="text-sm font-medium">
        <UButton color="black" variant="link" label="Kembali" />
      </NuxtLink>
    </div>

    <InvoiceDetails />
  </section>
</template>

<script setup>
const route = useRoute();

useHead({
  title: `Invoice Details`, // get the meta data from parent
});

definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
  middleware: 'auth',
  layout: 'default',
});
</script>
