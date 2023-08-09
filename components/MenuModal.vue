<template>
  <div>
    <UButton
      label="Add Menu"
      :ui="{ rounded: 'rounded-full' }"
      size="lg"
      icon="i-mdi-plus-circle"
      @click="isOpen = !isOpen"
    />

    <!-- Modal add new menu -->
    <UModal v-model="isOpen">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">New Menu</h2>
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
              v-model="state.name"
              placeholder="Sate"
              :disabled="loading"
            />
          </UFormGroup>

          <UFormGroup name="price" label="Harga">
            <UInput
              class="py-2 rounded"
              v-model="state.harga"
              placeholder="Rp. 4000"
              :disabled="loading"
            />
          </UFormGroup>

          <div class="flex gap-x-4 items-center">
            <span>Kategori:</span>
            <URadio label="Makanan" v-model="state.kategori_id" value="1" />
            <URadio label="Minuman" v-model="state.kategori_id" value="2" />
          </div>

          <UFormGroup name="stock" label="Stock">
            <UInput
              class="py-2 rounded"
              v-model="state.stock"
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
            label="Create Menu"
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
  </div>
</template>

<script setup>
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

const state = reactive({
  name: '',
  stock: 0,
  kategori_id: '',
  harga: 0,
});

const handleSubmit = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.from('menu').insert({
      name: state.name,
      stock: state.stock,
      kategori_id: state.kategori_id,
      satuan_id: selectedUnit.value.id,
      harga: state.harga,
    });
    if (error) throw error;

    toast.add({
      id: 'berhasil',
      title: 'Menu berhasil ditambahkan',
      description: 'Menu akan ditampilkan di halaman menu',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'green',
    });
    isOpen.value = false;
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
