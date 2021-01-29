module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      Cart_Session_ID: {
        type: Sequelize.INTEGER,
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
    });
  
    return Order;
  };