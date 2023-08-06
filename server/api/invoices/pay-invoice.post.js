import midtrans from 'midtrans-client';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const {
    transaction_details,
    item_details,
    customer_details,
    enabled_payment,
  } = body;

  let snap = new midtrans.Snap({
    isProduction: false,
    serverKey: config.midtransServerKey,
    clientKey: config.public.midtransClientKey,
  });

  let paramater = {
    transaction_details,
    credit_card: {
      secure: true,
    },
    item_details,
    customer_details,
    enabled_payment,
    callbacks: {
      finish: 'http://localhost:3000',
    },
  };

  const token = await snap.createTransactionToken(paramater);

  return token;
});
