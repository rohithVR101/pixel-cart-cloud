exports.process = (req, res) => {
  console.log(req);
  var Razorpay = require("razorpay");
  var instance = new Razorpay({
    key_id: process.env.PAYMENT_KEY_ID,
    key_secret: process.env.PAYMENT_KEY_SECRET,
  });
  var amount = req.body.amount,
    currency = "INR",
    receipt = req.body.order_id,
    payment_capture = true;
  let order_id;

  instance.orders
    .create({ amount, currency, receipt, payment_capture })
    .then((response) => {
      console.log("**********Order Created***********");
      console.log(response);
      console.log("**********Order Created***********");
      order_id = response.id;
      console.log(response);
      res.send(order_id);
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.payment = (req, res) => {
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
