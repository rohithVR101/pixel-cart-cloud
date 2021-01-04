module.exports = app => {
    const customers = require("../controller/customer.controller");
  
    var router = require("express").Router();
  
    // Create a new customer
    router.post("/new", customers.create);
  
    // // Retrieve all customers
    router.get("/", customers.findAll);
  
    // // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    // // Retrieve a single customer with id
     router.get("/:id", customers.findOne);
  
    // // Update a customer with id
     router.put("/update/:id", customers.update);
  
    // // Delete a customer with id
     router.delete("/remove/:id", customers.delete);
  
    // // Delete all products
    // router.delete("/", products.deleteAll);
  
    app.use("/api/customers", router);
  };