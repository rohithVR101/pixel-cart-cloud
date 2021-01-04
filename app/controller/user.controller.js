const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
// var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}
 
exports.login= function(req, res) {
 
    res.render('login');
 
}