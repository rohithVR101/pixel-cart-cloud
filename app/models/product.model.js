module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    product_code: {
      type: Sequelize.INTEGER
    },
    product_name: {
      type: Sequelize.STRING
    },
    product_price: {
      type: Sequelize.FLOAT
    },
    product_stock: {
      type: Sequelize.INTEGER
    }
  });

  return Product;
};
