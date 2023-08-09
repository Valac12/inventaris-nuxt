export default defineAppConfig({
  ui: {
    primary: 'violet',
    gray: 'cool',
    notifications: {
      position: 'top-0 right-0',
    },
    container: {
      constrained: 'max-w-5xl',
    },
    slideover: {
      width: 'w-screen max-w-xl',
      wrapper: 'fixed inset-0 h-screen flex z-50 overflow-scroll',
      base: 'relative  w-full focus:outline-none',
    },
  },
  colorMode: {
    preference: 'light',
  },
});
