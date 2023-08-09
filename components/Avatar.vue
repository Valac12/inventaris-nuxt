<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="mx-auto h-40 w-40 rounded-full"
    />
    <div
      v-else
      class="avatar no-image"
      :style="{ height: size, width: size }"
    />

    <label
      for="dropzone-file"
      class="mx-auto mt-2 cursor-pointer flex w-full flex-col items-center rounded-xl border-2 border-dashed border-blue-400 dark:bg-gray-900 p-6 text-center"
    >
      <UIcon
        name="i-pepicons-pencil-cloud-up"
        class="h-10 w-10 text-blue-500"
      />

      <h2
        class="mt-4 text-xl font-medium dark:text-gray-400 text-gray-600 tracking-wide"
      >
        Upload your avatar
      </h2>

      <p class="mt-2 text-gray-500 tracking-wide">
        Upload or darg & drop your file SVG, PNG, JPG.
      </p>

      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        accept="image/*"
        @change="uploadAvatar"
      />
    </label>
  </div>
</template>

<script setup>
const props = defineProps(['path']);
const { path } = toRefs(props);

const emit = defineEmits(['update:path', 'upload']);

const supabase = useSupabaseClient();
const toast = useToast();

const uploading = ref(false);
const src = ref('');
const files = ref();

async function downloadImage() {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.log('Error load the image', error.message);
  }
}

async function uploadAvatar(event) {
  files.value = event.target.files;

  try {
    uploading.value = true;

    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      toast.add({
        id: 'failed_update',
        title: 'Failed to upload',
        description: uploadError.message,
        timeout: 5000,
        color: 'red',
      });
    }

    emit('update:path', filePath);
    emit('upload');
  } catch (error) {
    toast.add({
      id: 'something_went_wrong',
      title: 'Something went wrong',
      description: error.message,
      timeout: 5000,
      color: 'red',
    });
  } finally {
    uploading.value = false;
  }
}

downloadImage();

watch(path, () => {
  if (path.value) {
    downloadImage();
  }
});
</script>
