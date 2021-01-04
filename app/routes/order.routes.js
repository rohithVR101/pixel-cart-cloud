module.exports = app => {
    const orders = require("../controller/order.controller");
  
    var router = require("express").Router();
  
    // Create a new order
    router.post("/new", orders.create);
  
    // // Retrieve all orders
    router.get("/", orders.findAll);
  
    // // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    // // Retrieve a single order with id
     router.get("/:id", orders.findOne);
  
    // // Update a order with id
     router.put("/update/:id", orders.update);
  
    // // Delete a order with id
     router.delete("/remove/:id", orders.delete);
  
    // // Delete all products
    // router.delete("/", products.deleteAll);
  
    app.use("/api/orders", router);
  };