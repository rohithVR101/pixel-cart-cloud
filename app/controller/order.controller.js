const db = require("../models");
const Order = db.orders;
const CartSession = db.cart_session;
const Op = db.Sequelize.Op;

// Create and Save a new
exports.create = (req, res) => {
  // if (!req.body.Order_ID) {
  //     res.status(400).send({
  //       message: "Order ID cannot be empty!"
  //     });
  //     return;
  //   }

  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        const order = {
          Cart_Session_ID: r.dataValues.Current_ID,
          Bill_No: req.body.Bill_No,
          Customer_Phone: req.body.Customer_Phone,
          Product_ID: req.body.Product_ID,
          Product_Name: req.body.Product_Name,
          Quantity: req.body.Quantity,
          Rate: req.body.Rate,
          Amount: req.body.Amount,
          Order_Date: req.body.Order_Date,
          Order_Time: req.body.Order_Time,
          Payment_Mode: req.body.Payment_Mode,
          Received_Amount: req.body.Received_Amount,
          Balance_Given: req.body.Balance_Given,
          CGST: req.body.CGST,
          SGST: req.body.SGST,
          Discount: req.body.Discount,
          Sub_Total: req.body.Sub_Total,
        };
        Order.create(order)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the order.",
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

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
  const Product_Name = req.query.Product_Name;
  var condition = Product_Name
    ? { Product_Name: { [Op.like]: `%${Product_Name}%` } }
    : null;

  Order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order.",
      });
    });
};

// Find a single order for bill printing
exports.findOne = (req, res) => {
  const Bill_No = req.params.id;
  var condition = Bill_No ? { Bill_No: { [Op.like]: `%${Bill_No}%` } } : null;

  Order.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving order.",
      });
    });
};
// exports.findOne = (req, res) => {
//   const id = req.body.order_id;

//   Order.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving order with id=" + id
//       });
//     });
// };

// Update a order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { Order_ID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating order with id=" + id,
      });
    });
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { Order_ID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete order with id=" + id,
      });
    });
};

// Delete a order with the specified id in the request
exports.deleteAll = (req, res) => {
  CartSession.findAll({
    attributes: ["Current_ID"],
  })
    .then((data) => {
      data.map((r) => {
        Order.destroy({
          where: { Cart_Session_ID: r.dataValues.Current_ID },
        }).then(() => {
          res.send("Orders cleared.");
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
