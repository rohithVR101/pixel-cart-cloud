module.exports = (app) => {
  const payment = require("../controller/payment.controller");

  var router = require("express").Router();

  // Create a new product
  router.post("/pay", payment.process);

  app.use("/api/payment", router);
};
