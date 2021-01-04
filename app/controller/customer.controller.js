const db = require("../models");
const Customer = db.customers;
const Op = db.Sequelize.Op;

// Create and Save a new 
exports.create = (req, res) => {

    if (!req.body.Customer_Phone) {
        res.status(400).send({
          message: "Customer ID cannot be empty!"
        });
        return;
      }
     
      const customer = {
        Customer_Phone: req.body.Customer_Phone,
        Customer_Name: req.body.Customer_Name,
        Customer_Email:req.body.Customer_Email
      };
      
      Customer.create(customer)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customer."
          });
        });
};


// Retrieve all customer from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Customer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};


// Find a single customer with an id
exports.findOne = (req, res) => {
  const id = req.body.Customer_Phone;

  Customer.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id
      });
    });
};


// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.body.Customer_Phone;

  Customer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    });
};



// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.Customer_Phone;

  Customer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id
      });
    });
};