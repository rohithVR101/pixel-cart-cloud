exports.process = (req, res) => {
  var Razorpay = require("razorpay");
  var instance = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
  });
  var amount = req.body.amount,
    currency = "INR",
    receipt = req.body.order_id,
    payment_capture = true,
    notes = "Online transcation for SIET Cart";
  let payment_id;

  instance.orders
    .create({ amount, currency, receipt, payment_capture, notes })
    .then((response) => {
      console.log("**********Order Created***********");
      console.log(response);
      console.log("**********Order Created***********");
      order_id = response.id;
    })
    .catch((error) => {
      console.log(error);
    });

  payment_id = req.body;
  console.log("**********Payment authorized***********");
  console.log(payment_id);
  console.log("**********Payment authorized***********");
  instance.payments
    .fetch(payment_id.razorpay_payment_id)
    .then((response) => {
      console.log("**********Payment instance***********");
      console.log(response);
      console.log("**********Payment instance***********");
      instance.payments
        .capture(payment_id.razorpay_payment_id, response.amount)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
