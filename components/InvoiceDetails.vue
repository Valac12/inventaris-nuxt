<template>
  <ClientOnly>
    <UCard as="div" class="shadow-md border-none p-6">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h5 class="text-2xl font-bold">
              <span class="text-gray-400 mr-0.5">#</span
              >{{ $route.params.id.substring(0, 6) }}
            </h5>
            <div
              class="flex flex-col"
              v-for="(item, index) in props.data.item_list"
              :key="index"
            >
              <span class="font-medium text-gray-500 dark:text-gray-400">{{
                item.name
              }}</span>
            </div>
          </div>

          <div class="flex flex-col items-end text-sm">
            <span>Taman Imbi, Jayapura Utara</span>
            <span>Jayapura</span>
            <span>99351</span>
            <span>Indonesia</span>
          </div>
        </div>
      </template>

      <div class="flex items-start justify-between mt-12 mb-10">
        <div class="flex flex-col justify-between gap-y-4">
          <div>
            <h6
              class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
            >
              Invoice Date
            </h6>
            <span class="font-semibold">{{ timestamp }}</span>
          </div>
          <div>
            <h6
              class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
            >
              Due date:
            </h6>
            <span class="font-semibold">28 September, 2023</span>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-y-4">
          <div>
            <h5
              class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
            >
              Bill To
            </h5>
            <span class="font-semibold capitalize">{{
              props.data.customer
            }}</span>
          </div>

          <div class="flex flex-col items-start text-sm">
            <span>+62{{ props.data.customer_phone_number }}</span>
            <span>BTN puskopad atas, Abepura</span>
            <span>Jayapura</span>
            <span>99351</span>
          </div>
        </div>

        <div>
          <h5
            class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
          >
            Sent To
          </h5>
          <span class="font-semibold">Angkringan Mas Pur</span>
        </div>
      </div>

      <div class="bg-gray-100 dark:bg-slate-800/90 p-6 rounded-lg">
        <table class="w-full">
          <tr class="flex gap-4 mb-4">
            <th class="font-light text-sm basis-1/2 text-start">Item Name</th>
            <th class="font-light text-sm basis-[10%] text-end">Quantity</th>
            <th class="font-light text-sm basis-1/5 text-end">Price</th>
            <th class="font-light text-sm self-center text-end basis-1/5">
              Total
            </th>
          </tr>
          <tr
            class="flex gap-4"
            v-for="(item, index) in props.data.item_list"
            :key="index"
          >
            <td class="font-medium basis-1/2 capitalize">
              {{ item.name }}
            </td>
            <td class="font-medium basis-[10%] text-end">
              {{ item.quantity }}
            </td>
            <td class="font-medium basis-1/5 text-end">
              Rp. {{ formattedTotalPrice(item.price) }}
            </td>
            <td class="font-medium self-center basis-1/5 text-end">
              Rp.
              {{ formattedTotalPrice(item.price, item.quantity) }}
            </td>
          </tr>

          <div
            class="border-t border-gray-700 mt-2 pt-2 flex items-center justify-end"
          >
            <span class="font-medium"
              >Rp. {{ formattedTotalPrice(totalPrice) }}</span
            >
          </div>
        </table>
      </div>

      <slot />
    </UCard>
  </ClientOnly>
</template>

<script setup>
const props = defineProps(['data']);
const date = new Date(props.data.created_at);
const timestamp = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const item_list = props.data.item_list;
let totalPrice = ref(0);
for (const item of item_list) {
  totalPrice.value += item.quantity * item.price;
}

function formattedTotalPrice(price, quantity = null) {
  let totalPrice = 0;
  if (quantity > 0 || quantity !== null) {
    totalPrice = price * quantity;
  } else {
    totalPrice = price;
  }

  return totalPrice.toLocaleString('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
</script>
