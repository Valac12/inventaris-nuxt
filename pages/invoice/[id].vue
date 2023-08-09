<template>
  <section>
    <div class="w-full mb-4">
      <NuxtLink to="/" class="text-sm font-medium">
        <UButton color="black" variant="link" label="Kembali" />
      </NuxtLink>
    </div>

    <InvoiceDetails :data="selling">
      <UButton
        label="Bayar"
        @click="paymentSnap"
        class="mt-4"
        block
        v-if="selling.payment_type !== 'Cash'"
      />
    </InvoiceDetails>
  </section>
</template>

<script setup>
import Base64 from 'midtrans-payment/src/base64';

const config = useRuntimeConfig();
useHead({
  title: `Invoice Details`, // get the meta data from parent
  script: [
    {
      src: 'https://app.sandbox.midtrans.com/snap/snap.js', // get rid the 'sandbox' from the url if want to switched in to production mode
      'data-client-key': config.public.midtransClientKey,
    },
  ],
});
definePageMeta({
  name: 'InvoiceDetails',
  pageTransition: {
    name: 'rotate',
  },
  middleware: 'auth',
  layout: 'default',
});

// get id from params and fetch specific invoice
const { id } = useRoute().params;
const toast = useToast();
// fetch data from server/api
const { data: selling } = await useFetch(`/api/invoices/${id}`);

// sum the total price in item_list(JSON type) column
let totalPrice = 0;
for (const item of selling.value.item_list) {
  totalPrice += item.quantity * item.price;
}

// send the invoice data to generate token for midtrans-client SNAP
const sendDataToGetToken = async () => {
  const { data: payment } = await useFetch(`/api/invoices/pay-invoice`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: new Base64(config.public.midtransClientKey + ':'),
    },
    body: {
      transaction_details: {
        order_id: `maspur-${+Math.round(new Date().getTime() / 1000)}`,
        gross_amount: totalPrice,
      },
      item_details: selling.value.item_list.map((item) => {
        return {
          id: item.menu_id,
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        };
      }),
      customer_details: {
        first_name: selling.value.customer,
        phone: '+62' + selling.value.customer_phone_number,
      },
      enabled_payments: [
        'credit_card',
        'cimb_clicks',
        'bca_klikbca',
        'bca_klikpay',
        'bri_epay',
        'echannel',
        'permata_va',
        'bca_va',
        'bni_va',
        'bri_va',
        'other_va',
        'gopay',
        'indomaret',
        'danamon_online',
        'akulaku',
        'shopeepay',
        'kredivo',
        'uob_ezpay',
      ],
    },
  });

  return payment;
};

// SNAP popped-up after click 'Bayar' in the front-end
const paymentSnap = async () => {
  const getToken = await sendDataToGetToken();
  let token = getToken.value;

  snap.pay(token, {
    onSuccess: function (result) {
      useRouter().push('/');
      toast.add({
        id: result.order_id,
        title: `${result.channel_response_message}`,
        description: result.status_message,
        timeout: 5000,
        icon: 'i-heroicons-check-circle',
        color: 'green',
      });
    },
    onError: function (result) {
      alert(result.status_message);
    },
  });
};
</script>
