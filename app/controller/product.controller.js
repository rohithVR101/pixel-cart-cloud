const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new
exports.create = (req, res) => {
  if (!req.body.product_code) {
    res.status(400).send({
      message: "Product ID cannot be empty!",
    });
    return;
  }

  const product = {
    product_code: req.body.product_code,
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_stock: req.body.product_stock,
  };

  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const product_name = req.query.product_name;
  var condition = product_name
    ? { product_name: { [Op.like]: `%${product_name}%` } }
    : null;

  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single product with an id

exports.findOne = (req, res) => {
  const product_code = req.params.id;
  var condition = product_code
    ? { product_code: { [Op.like]: `%${product_code}%` } }
    : null;

  Product.findOne({ where: condition })
    .then((data) => {
      res.send(data);
      // return data;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Product.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Product with id=" + id
//       });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { product_code: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { product_code: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};
