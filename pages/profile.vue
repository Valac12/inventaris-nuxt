<template>
  <section>
    <UCard class="md:w-2/3 mx-auto dark:bg-slate-800 shadow-lg rounded p-6">
      <h1
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        My profile
      </h1>
      <h3 class="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
        Update your personal information and preferences
      </h3>
      <hr class="mb-8" />

      <form @submit.prevent="updateProfile" enctype="multipart/form-data">
        <div class="flex flex-col gap-y-4">
          <UFormGroup name="username" label="Username" class="space-y-2 w-full">
            <UInput
              placeholder="johndoe"
              class="py-2 rounded-md"
              v-model="username"
          /></UFormGroup>

          <UFormGroup
            name="fullname"
            label="Full Name"
            class="space-y-2 w-full"
          >
            <UInput
              placeholder="John Doe"
              class="py-2 rounded-md"
              v-model="full_name"
          /></UFormGroup>

          <Avatar v-model:path="avatar_url" />

          <UButton
            block
            type="submit"
            :label="loading ? 'Uploading...' : 'Update Profile'"
            class="mt-2"
            :loading="loading"
          />
        </div>
      </form>
    </UCard>
  </section>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useHead({
  title: 'My Profile Page',
});

const authStore = useAuthStore();

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();

const loading = ref(false);
const username = ref('');
const full_name = ref('');
const avatar_url = ref('');

loading.value = true;

let { data } = await supabase
  .from('profiles')
  .select('username, full_name, avatar_url')
  .eq('id', user.value.id)
  .single();

if (data) {
  authStore.user = {
    username: data.username,
    full_name: data.full_name,
    avatar_url: data.avatar_url,
  };
}

loading.value = false;

const updateProfile = async () => {
  try {
    loading.value = true;

    const updates = {
      id: user.value.id,
      username: username.value.toLowerCase(),
      full_name: full_name.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(updates, { returning: 'minimal' });

    if (error) {
      toast.add({
        id: 'failed_update',
        title: 'Failed to update',
        description: error.message,
        timeout: 5000,
        color: 'red',
      });
    }
  } catch (error) {
    toast.add({
      id: 'something_went_wrong',
      title: 'Something went wrong',
      description: error.message,
      timeout: 5000,
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};
</script>
