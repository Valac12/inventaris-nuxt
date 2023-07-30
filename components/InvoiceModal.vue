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
      <form class="flex flex-col gap-y-16" @submit.prevent="handleSubmit">
        <!-- bill to -->
        <div class="flex flex-col gap-y-4">
          <h5 class="text-sm text-violet-500 font-semibold">Bill To</h5>
          <UFormGroup
            name="customerName"
            label="Customer's Name"
            class="space-y-2"
          >
            <UInput placeholder="Dini Abshari" class="py-2 rounded-sm"
          /></UFormGroup>

          <UFormGroup
            name="customerAddress"
            label="Street Address"
            class="space-y-2"
          >
            <UInput placeholder="Jl. Soa Siu" class="py-2 rounded-sm"
          /></UFormGroup>
          <div class="flex items-center justify-between gap-x-4">
            <UFormGroup
              name="cityCustomerFrom"
              label="City"
              class="space-y-2 w-full"
            >
              <UInput placeholder="Jayapura" class="py-2 rounded-sm"
            /></UFormGroup>
            <UFormGroup
              name="cityZipcodeCustomerFrom"
              label="Zip Code"
              class="space-y-2 w-full"
            >
              <UInput placeholder="Jayapura" class="py-2 rounded-sm"
            /></UFormGroup>
          </div>
        </div>

        <!-- payment -->
        <div class="flex flex-col gap-y-4">
          <div class="flex items-center gap-x-4 justify-between">
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
                v-model="selected"
                :options="paymentTypes"
                class="py-2 rounded-sm"
              />
            </UFormGroup>
          </div>

          <!-- list of items -->
          <div>
            <h5 class="text-lg text-violet-500 font-semibold mb-2">
              Item List
            </h5>
            <table>
              <tr class="flex gap-4 text-sm">
                <th class="font-normal text-start basis-1/2">Item Name</th>
                <th class="font-normal text-start basis-[10%]">Qty</th>
                <th class="font-normal text-start basis-1/5">Price</th>
                <th class="font-normal text-start basis-1/5 self-center">
                  Total
                </th>
              </tr>

              <tr
                v-for="(item, index) in invoiceStore.invoiceItemList"
                :key="index"
                class="flex text-sm mb-2"
              >
                <td class="basis-1/2">
                  <USelectMenu
                    class="py-2 rounded"
                    v-model="item.itemName"
                    :options="menu"
                    placeholder="Pilih Menu..."
                    selected-icon="i-heroicons-hand-thumb-up-solid"
                    searchable="true"
                    searchable-placeholder="Pilih Menu..."
                  />
                </td>
                <td class="basis-[10%]">
                  <UInput class="py-2 rounded" v-model="item.quantity" />
                </td>
                <td class="basis-1/5">
                  <UInput class="py-2 rounded" v-model="item.pricePerUnit" />
                </td>
                <td class="basis-1/5 text-end self-center">
                  ${{ (item.totalPrice = item.quantity * item.pricePerUnit) }}
                </td>

                <UButton
                  icon="i-bi-trash3-fill"
                  @click="invoiceStore.deleteInvoiceItem(item.id)"
                  :ui="{ rounded: 'rounded-full' }"
                  variant="soft"
                  color="black"
                  size="md"
                />
              </tr>
            </table>
            <div class="mt-2">
              <UButton
                label="Add new item"
                @click="invoiceStore.addNewInvoiceItem"
                :ui="{ rounded: 'rounded-full' }"
                block
                variant="outline"
                class="py-2"
              />
            </div>
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
import { useInvoiceStore } from '../stores/invoiceStore';

const invoiceStore = useInvoiceStore();

function handleSubmit() {
  invoiceStore.addInvoiceToDatabase();
}

const date = ref(new Date());
const label = computed(() =>
  date.value.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
);

const paymentTypes = ['Cash', 'E-banking', 'E-wallet'];
const selected = ref(paymentTypes[0]);

const menu = [
  'Nasi Kucing',
  'Nasi Kuning',
  'Pentol Bakar',
  'Hati Ayam',
  'Popmie',
];
</script>
