<template>
  <div class="flex basis-3/5 gap-x-4 items-center text-sm">
    <span class="flex-1">#{{ props.data.id.substring(0, 6) }}</span>
    <span class="flex-1">{{ timestamp }}</span>
    <span class="flex-1 font-medium capitalize">{{ props.data.customer }}</span>
  </div>

  <div class="flex items-center gap-x-4 basis-2/5 text-sm">
    <span class="flex-1 font-semibold text-lg"
      >Rp. {{ formattedTotalPrice }}</span
    >

    <div
      class="w-32 inline-flex justify-center items-center gap-x-2 bg-green-400 py-1.5 rounded-md"
    >
      <UIcon
        :name="props.data.payment_type === 'Paypal' ? 'i-logos-paypal' : false"
      />
      <span class="text-white text-sm font-semibold">{{
        props.data.payment_type
      }}</span>
    </div>

    <UIcon name="i-ic-round-chevron-right" />
  </div>
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
let totalPrice = 0;
for (const item of item_list) {
  totalPrice += item.quantity * item.price;
}

const formattedTotalPrice = totalPrice.toLocaleString('id-ID', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
</script>
