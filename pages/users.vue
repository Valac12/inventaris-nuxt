<template>
  <div>management users</div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useHead({
  title: 'Users Page',
});
</script>
