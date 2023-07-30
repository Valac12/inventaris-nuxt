import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isOpen: false,
    user: null,
  }),
  actions: {},
});
