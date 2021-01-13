const db = require("../models");
const Cart = db.cart;
const CartSession = db.cart_session;
const Product = db.products;
const Op = db.Sequelize.Op;

exports.refresh = (req, res) => {
  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        const session = r.dataValues.Current_ID;
        var condition = session
          ? { Cart_Session_ID: { [Op.eq]: r.dataValues.Current_ID } }
          : null;

        Cart.findAll({ where: condition })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving the cart.",
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};

//create new  cart
exports.create = (req, res) => {
  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        CartSession.update(
          { Current_ID: r.dataValues.Current_ID + 1 },
          {
            where: { id: 1 },
          }
        )
          .then((num) => {
            if (num == 1) {
              res.send({
                message:
                  "New cart session initiated. Cart ID is " +
                  (r.dataValues.Current_ID + 1),
              });
            } else {
              res.send({
                message: "Cannot create new cart!" + num,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Cannot create new cart! Please try again",
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};

//add new product to cart
exports.add = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Product ID cannot be empty!",
    });
    return;
  }

  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        const product_code = req.params.id;
        var condition = product_code
          ? { product_code: { [Op.eq]: `${product_code}` } }
          : null;

        Product.findOne({ where: condition })
          .then((data) => {
            const cart = {
              Cart_Session_ID: r.dataValues.Current_ID,
              Product_ID: data.product_code,
              Product_Name: data.product_name,
              Quantity: 1,
              Price: data.product_price,
            };
            Cart.create(cart)
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while adding product to the cart.",
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving product.",
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};

// Update a cart by the id in the request
exports.update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "Product ID cannot be empty!",
    });
    return;
  }

  if (!req.body.quantity) {
    res.status(400).send({
      message: "Quantity cannot be empty!",
    });
    return;
  }

  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        const id = req.params.id;
        var condition = id ? { product_code: { [Op.eq]: id } } : null;

        Product.findOne({ where: condition })
          .then((product) => {
            Cart.update(
              {
                Quantity: req.body.quantity,
                Price: product.dataValues.product_price * req.body.quantity,
              },
              {
                where: {
                  Product_ID: id,
                  Cart_Session_ID: r.dataValues.Current_ID,
                },
              }
            )
              .then((num) => {
                if (num == 1) {
                  res.send({
                    message: "Cart was updated successfully.",
                  });
                } else {
                  res.send({
                    message: `Cannot update cart for product with id=${id}. Maybe Product was not found in the cart or req.body is empty!`,
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating cart with id=" + id,
                });
              });
          })

          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving product.",
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        Cart.destroy({
          where: { Product_ID: id, Cart_Session_ID: r.dataValues.Current_ID },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Product was deleted from cart successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete product from cart with product id=${id}. Maybe Product was not found!`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                "Could not delete product from cart with product id=" + id,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};

exports.clear = (req, res) => {
  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        Cart.destroy({
          where: { Cart_Session_ID: r.dataValues.Current_ID },
        })
          .then(() => {
            res.send("Cart emptied.");
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving current session id.",
      });
    });
};
