module.exports = app => {
    const carts = require("../controller/cart.controller");
  
    var router = require("express").Router();
  
    // Create a new customer
    router.post("/new", carts.create);
  
    // // Retrieve all customers
    // router.get("/", customers.findAll);
  
    // // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    // // Retrieve a single customer with id
    //  router.get("/:id", customers.findOne);
  
    // // Update a customer with id
     router.put("/:id", carts.update);
  
    // // Delete a customer with id
     router.delete("/:id", carts.delete);
  
    // // Delete all products
    // router.delete("/", products.deleteAll);
  
    app.use("/api/carts", router);
  };