require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

const db = require("./app/models");
db.sequelize.sync();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/app/index.html");
});

require("./app/routes/product.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/cart.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/payment.routes.js")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "-------------------------------------------------------Server is running---------------------------------------------- "
  );
});
