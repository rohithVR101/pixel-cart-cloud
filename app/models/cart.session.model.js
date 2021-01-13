module.exports = (sequelize, Sequelize) => {
  const CartSession = sequelize.define("cart_session", {
    Current_ID: {
      type: Sequelize.INTEGER,
    },
  });

  return CartSession;
};
