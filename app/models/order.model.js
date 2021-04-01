module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    Cart_Session_ID: {
      type: Sequelize.INTEGER,
    },
    Bill_No: {
      type: Sequelize.STRING,
    },
    Customer_Phone: {
      type: Sequelize.STRING,
    },
    Product_ID: {
      type: Sequelize.INTEGER,
    },
    Product_Name: {
      type: Sequelize.STRING,
    },
    Quantity: {
      type: Sequelize.INTEGER,
    },
    Rate: {
      type: Sequelize.FLOAT,
    },
    Amount: {
      type: Sequelize.FLOAT,
    },
    Order_Date: {
      type: Sequelize.STRING,
    },
    Order_Time: {
      type: Sequelize.STRING,
    },
    Payment_Mode: {
      type: Sequelize.STRING,
    },
    Received_Amount: {
      type: Sequelize.FLOAT,
    },
    Balance_Given: {
      type: Sequelize.FLOAT,
    },
    CGST: {
      type: Sequelize.FLOAT,
    },
    SGST: {
      type: Sequelize.FLOAT,
    },
    Sub_Total: {
      type: Sequelize.FLOAT,
    },
    Discount: {
      type: Sequelize.FLOAT,
    },
  });

  return Order;
};
