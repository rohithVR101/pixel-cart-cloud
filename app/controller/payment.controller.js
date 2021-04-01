exports.process = () => {
  const stripesdk = require("stripe");
  const stripe = new stripesdk.STRIPE_SDK(process.env.PAYMENT_KEY_SECRET);
  stripe.charges.create(
    {
      amount: 1000,
      currency: "inr",
      source: "STRIPE_TOKEN_FROM_CLIENT",
      description: "Credit card/Debit card payment",
      metadata: {
        key: value, // any meta-data you want to store
      },
    },
    (err, charge) => {
      if (err) {
        console.log(err);
      } else {
        console.log(charge);
      }
    }
  );
};
