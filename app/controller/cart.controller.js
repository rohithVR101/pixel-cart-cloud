const db = require("../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;

//create new  cart
exports.create = (req, res) => {

    if (!req.body.Product_ID) {
        res.status(400).send({
          message: "ID cannot be empty!"
        });
        return;
      }
     
      const cart = {
        Product_ID: req.body.Product_ID,
        Product_Name: req.body.Product_Name,
        Quantity:req.body.Quantity,
        Price:req.body.Price,
        Cart_Session_ID:req.body.Cart_Session_ID
      };
      
      Cart.create(cart)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the cart."
          });
        });
};



// Update a cart by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Cart.update(req.body, {
      where: { Product_ID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cart was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update cart with id=${id}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating cart with id=" + id
        });
      });
  };
  
  
  
  // Delete a customer with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cart.destroy({
      where: { Product_ID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "cart was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete cart with id=${id}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cart with id=" + id
        });
      });
  };