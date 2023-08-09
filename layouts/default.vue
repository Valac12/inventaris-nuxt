<template>
  <Navbar :isOpen="authStore.isOpen" @open-sidebar="openSidebar" />
  <UContainer class="lg:my-16" as="div">
    <NuxtPage>
      <slot />
    </NuxtPage>
  </UContainer>
  <USlideover v-model="authStore.isOpen">
    <!-- Content -->
    <InvoiceModal />
  </USlideover>
  <UNotifications />
</template>

<script setup>
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();

function openSidebar() {
  authStore.isOpen = !authStore.isOpen;
}
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      authStore.isOpen = !authStore.isOpen;
    },
  },
});
</script>
