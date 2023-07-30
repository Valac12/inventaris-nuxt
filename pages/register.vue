<template>
  <section>
    <UCard
      class="md:w-3/5 mx-auto mt-24 dark:bg-slate-800 shadow-lg rounded p-6"
    >
      <h1 class="text-xl font-semibold mb-4 text-center">Angkringan Mas Pur</h1>
      <h3 class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4">
        Register your account to continue.
      </h3>
      <hr class="mb-8" />
      <form>
        <div class="flex flex-col gap-y-4">
          <UFormGroup
            name="email"
            label="Email Address"
            class="space-y-2 w-full"
            help="We will never share your email with anyone else."
            :error="errMsg"
          >
            <UInput
              placeholder="youremail@gmail.com"
              class="py-2 rounded-md"
              v-model="email"
              icon="i-heroicons-envelope"
              :trailing-icon="
                isError ? 'i-heroicons-exclamation-triangle-20-solid' : ''
              "
          /></UFormGroup>
          <UFormGroup
            name="password"
            label="Your Password"
            class="space-y-2 w-full"
          >
            <UInput
              type="password"
              placeholder="*********"
              class="py-2 rounded-md"
              v-model="password"
              icon="i-heroicons-lock-closed"
          /></UFormGroup>
          <UFormGroup
            name="cPassword"
            label="Confirm Your Password"
            class="space-y-2 w-full"
          >
            <UInput
              type="password"
              placeholder="*********"
              class="py-2 rounded-md"
              v-model="cPassword"
              icon="i-heroicons-lock-closed"
          /></UFormGroup>
          <UButton
            block
            @click="handleRegister"
            label="Register"
            class="mt-2"
            :loading="loading"
          />

          <div
            class="w-full flex flex-col items-center justify-center gap-y-2 mt-2"
          >
            <NuxtLink to="/" class="underline text-sm font-light">
              Forgot your password?
            </NuxtLink>
            <NuxtLink to="/login" class="underline text-sm font-light">
              Already have an account? Sign in.
            </NuxtLink>
          </div>
        </div>
      </form>
    </UCard>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
});

useHead({
  title: 'Register Page',
});

const supabase = useSupabaseAuthClient();
const user = useSupabaseUser();
const toast = useToast();

const loading = ref(false);
const email = ref('');
const password = ref('');
const cPassword = ref('');
const isError = ref(false);
const errMsg = ref('');

const handleRegister = async () => {
  try {
    if (password.value !== cPassword.value) {
      errMsg.value = 'Password do not match';
      return;
    }

    loading.value = true;

    const { error, data } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      isError.value = true;
      errMsg.value = error.message;
      setTimeout(() => {
        errMsg.value = '';
      }, 5000);
      console.log(error);
      return null;
    }
    toast.add({
      id: 'check_email',
      title: 'Success! Please check your email',
      description: 'Check your email to confirm your authentication.',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'green',
    });
  } catch (error) {
    console.log(error);
    toast.add({
      id: 'failed',
      title: 'Failed!',
      description: 'Something went wrong :(',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};

if (user) {
  navigateTo('/');
}
</script>
