<template>
  <UButton
    icon="i-heroicons-trash"
    label="Delete Menu"
    color="gray"
    class="border flex-1"
    :ui="{ rounded: 'rounded-full' }"
    variant="ghost"
  />
  <UButton
    class="px-3 flex-1 inline-flex justify-center"
    :ui="{ rounded: 'rounded-full' }"
    @click="isOpen = !isOpen"
  >
    <UIcon name="i-heroicons-pencil-square" class="text-lg" />
    Edit Menu
  </UButton>

  <!-- Modal add new menu -->
  <UModal v-model="isOpen">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Update Menu</h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <!-- Content -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-4">
        <UFormGroup name="name" label="Nama Menu">
          <UInput
            class="py-2 rounded"
            v-model="namaMenu"
            placeholder="Sate"
            :disabled="loading"
          />
        </UFormGroup>

        <UFormGroup name="price" label="Harga">
          <UInput
            class="py-2 rounded"
            v-model="harga"
            placeholder="Rp. 4000"
            :disabled="loading"
          />
        </UFormGroup>

        <div class="flex gap-x-4 items-center">
          <span>Kategori:</span>
          <URadio label="Makanan" v-model="kategori_id" value="1" />
          <URadio label="Minuman" v-model="kategori_id" value="2" />
        </div>

        <UFormGroup name="stock" label="Stock">
          <UInput
            class="py-2 rounded"
            v-model="stock"
            placeholder="60"
            :disabled="loading"
          />
        </UFormGroup>

        <UFormGroup name="satuan_id" label="Satuan Unit">
          <USelectMenu
            v-model="selectedUnit"
            :options="units"
            placeholder="Pilih satuan unit"
            value-attribute="id"
            option-attribute="name"
          >
            <template #label>
              {{ selectedUnit.name }}
            </template>
          </USelectMenu>
        </UFormGroup>

        <UButton
          type="submit"
          label="Update"
          color="primary"
          class="py-2 px-6"
          block
          :ui="{ rounded: 'rounded' }"
          :disabled="loading"
        />
        <UButton
          type="reset"
          label="Reset"
          color="primary"
          variant="outline"
          class="py-2 px-6"
          block
          :ui="{ rounded: 'rounded' }"
          :disabled="loading"
        />
      </form>
    </UCard>
  </UModal>
</template>

<script setup>
const props = defineProps(['data']);
const supabase = useSupabaseClient();

const isOpen = ref(false);
const loading = ref(false);
const toast = useToast();

const units = [
  {
    id: 1,
    name: 'Bungkus',
  },
  {
    id: 2,
    name: 'Karton',
  },
  {
    id: 3,
    name: 'pcs',
  },
];
const selectedUnit = ref(units[0]);

const namaMenu = ref('');
const harga = ref('');
const stock = ref('');
const kategori_id = ref('');
if (props.data) {
  namaMenu.value = props.data.name;
  harga.value = props.data.harga;
  stock.value = props.data.stock;
  kategori_id.value = props.data.kategori_id;
}

const handleSubmit = async () => {
  try {
    loading.value = true;
    const { error, statusText } = await supabase
      .from('menu')
      .update({
        name: namaMenu.value,
        stock: stock.value,
        kategori_id: kategori_id.value,
        satuan_id: selectedUnit.value.id,
        harga: harga.value,
      })
      .eq('id', props.data.id);

    if (error) throw error;

    toast.add({
      id: 'berhasil',
      title: 'Menu telah diupdate.',
      description: `Menu ${namaMenu.value} berhasil diupdate!`,
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'green',
    });
    isOpen.value = false;
    useRouter().push({ name: 'Menu' });
  } catch (error) {
    toast.add({
      id: 'gagal',
      title: 'Menu gagal ditambahkan',
      description: error.message,
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};
</script>
