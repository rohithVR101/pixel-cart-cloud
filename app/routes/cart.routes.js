module.exports = app => {
  const carts = require("../controller/cart.controller");

  var router = require("express").Router();

  // Create a new cart
  router.post("/new", carts.create);

  // Add a product to cart with id
  router.post("/add/:id", carts.add);

  // Update a product to cart with id
  router.put("/:id", carts.update);

  // Delete a product to cart with id
  router.delete("/:id", carts.delete);
  
  // Retrieve cart
  router.get("/", carts.refresh);

  // Delete all products
  router.delete("/", carts.clear);

  app.use("/api/cart", router);
};