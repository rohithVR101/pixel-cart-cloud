module.exports = app => {
    const products = require("../controller/product.controller");
  
    var router = require("express").Router();
  
    // Create a new product
    router.post("/new", products.create);
  
    // // Retrieve all products
    router.get("/", products.findAll);
  
    // // Retrieve all published products
    // router.get("/published", products.findAllPublished);
  
    // // Retrieve a single product with id
     router.get("/:id", products.findOne);
  
    // // Update a product with id
     router.put("/update/:id", products.update);
  
    // // Delete a product with id
     router.delete("/remove/:id", products.delete);
  
    // // Delete all products
    // router.delete("/", products.deleteAll);
  
    app.use("/api/products", router);
  };