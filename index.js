const express= require("express");
const bodyparser=require("body-parser");
const cors = require("cors");
const passport   = require('passport')
const session    = require('express-session')
const exphbs = require('express-handlebars')
const app=express();

var corsOptions = {
  origin:"http://localhost:3000"
};

app.use(cors(corsOptions)); 

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}))

// app.use(passport.initialize());
// app.use(passport.session());

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

 



const db = require("./app/models");
// require('./app/config/passport/passport.js')(passport, db.user);
db.sequelize.sync();



app.get("/",function(req,res){
    res.send("Server is running.");
  }); 

require("./app/routes/product.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/cart.routes.js")(app);
// require('./app/routes/user.routes.js')(app);


app.listen(process.env.PORT || 3000,()=>{
    console.log("-------------------------------------------------------Server is running---------------------------------------------- ");
});