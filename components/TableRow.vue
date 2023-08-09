<template>
  <div class="flex basis-3/5 gap-x-4 items-center text-sm">
    <span class="flex-1">#{{ props.data.id.substring(0, 6) }}</span>
    <span class="flex-1">{{ timestamp }}</span>
    <span class="flex-1 font-medium capitalize">{{ props.title }}</span>
  </div>

  <div class="flex items-center gap-x-4 basis-2/5 text-sm">
    <span class="flex-1 font-semibold text-lg"
      >Rp. {{ formattedTotalPrice(totalPrice) }}</span
    >

    <div
      class="w-32 inline-flex justify-center items-center gap-x-2 bg-green-400 py-1.5 rounded-md"
    >
      <UIcon :name="props.type === 'Paypal' ? 'i-logos-paypal' : false" />
      <span class="text-white text-sm font-semibold">{{ props.type }}</span>
    </div>

    <UIcon name="i-ic-round-chevron-right" />
  </div>
</template>

<script setup>
const props = defineProps(['data', 'title', 'price', 'type']);
const date = new Date(props.data.created_at);
const timestamp = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

let totalPrice = 0;
for (const item of props.data?.item_list) {
  totalPrice += item.quantity * item.price;
}

function formattedTotalPrice(price, quantity = null) {
  let localTotalPrice = 0;
  if (quantity > 0 || quantity !== null) {
    localTotalPrice = price * quantity;
  } else {
    localTotalPrice = price;
  }

  return localTotalPrice.toLocaleString('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
</script>
