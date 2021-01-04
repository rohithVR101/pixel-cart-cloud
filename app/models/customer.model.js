module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      Customer_Phone: {
        type: Sequelize.INTEGER
      },
      Customer_Name: {
        type: Sequelize.STRING
      },
      Customer_Email: {
        type: Sequelize.STRING
      }
    });
  
    return Customer;
  };