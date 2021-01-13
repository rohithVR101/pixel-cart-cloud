module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      Cart_Session_ID:{
        type: Sequelize.INTEGER
      },
      Product_ID: {
        type: Sequelize.INTEGER
      },
      Product_Name: {
        type: Sequelize.STRING
      },
      Quantity: {
        type: Sequelize.INTEGER
      },
      Price:{
        type: Sequelize.FLOAT
      }
    });
  
    return Cart;
  };