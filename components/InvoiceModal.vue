<template>
  <ClientOnly>
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h3 class="font-bold text-2xl">New Nota</h3>
      </template>

      <!-- Content -->
      <form class="flex flex-col gap-y-12" @submit.prevent="handleSubmit">
        <!-- bill to -->
        <div class="flex flex-col gap-y-4">
          <h5 class="text-sm text-violet-500 font-semibold">Bill To</h5>
          <UFormGroup
            name="customerName"
            label="Customer's Name"
            class="space-y-2"
          >
            <UInput
              placeholder="Dini Abshari"
              class="py-2 rounded-sm"
              v-model="invoiceItems.customer"
          /></UFormGroup>

          <UFormGroup
            name="customerPhoneNumber"
            label="Phone Number"
            class="space-y-2"
          >
            <UInput v-model="invoiceItems.customerPhone">
              <template #leading>
                <span class="text-gray-500 dark:text-gray-400 text-xs"
                  >+62</span
                >
              </template>
            </UInput>
            /></UFormGroup
          >
        </div>

        <!-- payment -->
        <div class="flex flex-col gap-y-2">
          <h5 class="text-sm text-violet-500 font-semibold">Payment info</h5>
          <UFormGroup
            name="invoiceDate"
            label="Invoice Date"
            class="space-y-2 w-full"
          >
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                icon="i-heroicons-calendar-days-20-solid"
                :label="label"
              />

              <template #panel="{ close }">
                <DatePicker v-model="date" @close="close" />
              </template>
            </UPopover>
          </UFormGroup>

          <UFormGroup
            name="paymentTypes"
            label="Payment Types"
            class="space-y-2 mb-2 w-full"
          >
            <USelectMenu
              v-model="selectedPayment"
              :options="payments"
              placeholder="Select Payment"
              value-attribute="id"
              option-attribute="name"
            >
              <template #label>
                {{ selectedPayment.name }}
              </template>
            </USelectMenu>
          </UFormGroup>

          <!-- list of items -->
          <div class="flex flex-col gap-y-2 mt-6">
            <h3 class="text-sm text-violet-500 font-semibold">Item list</h3>
            <div
              class="flex flex-col items-center gap-x-4 gap-y-2 relative md:flex-row"
              v-for="(invoice, index) in invoiceStore.invoiceItemList"
              :key="index"
            >
              <div class="flex flex-col md:w-2/3">
                <UFormGroup name="menu" label="Menu">
                  <USelectMenu
                    class="py-2 rounded"
                    v-model="invoice.itemName"
                    :options="menu"
                    value-attribute="id"
                    option-attribute="name"
                    :searchable="true"
                    searchable-placeholder="Pilih Menu..."
                    placeholder="Pilih Menu..."
                  />
                </UFormGroup>
              </div>
              <div class="flex flex-col md:w-1/3">
                <UFormGroup name="quantity" label="Quantity">
                  <UInput class="py-2 rounded" v-model="invoice.quantity" />
                </UFormGroup>
              </div>

              <UFormGroup name="trash" label="&nbsp;">
                <UButton
                  icon="i-bi-trash3-fill"
                  @click="invoiceStore.deleteInvoiceItem(invoice.id)"
                  :ui="{ rounded: 'rounded-full' }"
                  variant="soft"
                  color="black"
                  size="xs"
                />
              </UFormGroup>
            </div>
            <UButton
              label="Add new item"
              @click="invoiceStore.addNewInvoiceItem"
              :ui="{ rounded: 'rounded-full' }"
              block
              variant="outline"
              class="py-2 mt-2"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-between">
          <div>
            <UButton
              type="reset"
              label="Reset"
              color="gray"
              variant="ghost"
              class="py-2 px-6"
              :ui="{ rounded: 'rounded-full' }"
            />
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <UButton
              label="Save to Draft"
              color="gray"
              class="py-2 px-6"
              :ui="{ rounded: 'rounded-full' }"
            />
            <UButton
              type="submit"
              label="Create Invoice"
              color="primary"
              class="py-2 px-6"
              :ui="{ rounded: 'rounded-full' }"
            />
          </div>
        </div>
      </form>
    </UCard>
  </ClientOnly>
</template>

<script setup>
import { useInvoiceStore } from '~/stores/invoiceStore';
import { useAuthStore } from '~/stores/authStore';

const toast = useToast();
const supabase = useSupabaseClient();
const invoiceStore = useInvoiceStore();
const authStore = useAuthStore();

const invoiceItems = reactive({
  customer: '',
  customerPhone: '',
});
const date = ref(new Date());
const label = computed(() =>
  date.value.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);

// payments SELECT OPTIONS
const payments = [
  {
    id: 1,
    name: 'Cash',
  },
  {
    id: 2,
    name: 'Credit Card',
  },
  {
    id: 3,
    name: 'Paypal',
  },
  {
    id: 4,
    name: 'Debit Card',
  },
];
const selectedPayment = ref(payments[0]);

// menus SELECT OPTIONS
let { data: menu } = await supabase.from('menu').select('id, name, harga');

// create invoice
async function handleSubmit() {
  try {
    const items = invoiceStore.invoiceItemList.map((invoice) => {
      return {
        menu_id: invoice.itemName.id,
        name: invoice.itemName.name,
        quantity: parseInt(invoice.quantity),
        price: parseInt(invoice.itemName.harga),
      };
    });

    const { error } = await supabase
      .from('selling')
      .insert([
        {
          customer: invoiceItems.customer,
          customer_phone_number: invoiceItems.customerPhone,
          payment_type: selectedPayment.value.name,
          created_at: date.value,
          item_list: items,
        },
      ])
      .select();

    if (error) throw error;

    authStore.isOpen = false;
    invoiceStore.invoiceItemList = [];
    toast.add({
      id: 'berhasil',
      title: 'Transaksi berhasil',
      description: 'Data transaksi ditampilkan di halaman utama',
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'green',
    });
    useRouter().push('/');
  } catch (error) {
    toast.add({
      id: 'gagal',
      title: 'Transaksi Gagal',
      description: error.message,
      icon: 'i-heroicons-check-circle',
      timeout: 5000,
      color: 'red',
    });
  }
}
</script>
