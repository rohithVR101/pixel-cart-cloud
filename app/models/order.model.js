module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      Order_ID: {
        type: Sequelize.INTEGER
      },
      Customer_Phone: {
        type: Sequelize.INTEGER
      },
      Order_Timestamp: {
        type: Sequelize.STRING
      },
      Product_Code: {
        type: Sequelize.INTEGER
      },
      Product_Name: {
        type: Sequelize.STRING
      },
      Quantity: {
        type: Sequelize.INTEGER
      },
      Pricey: {
        type: Sequelize.FLOAT
      }
    });
  
    return Order;
  };