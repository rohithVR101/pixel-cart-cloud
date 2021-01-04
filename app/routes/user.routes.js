// const passport = require("../config/passport/passport.js");
const path = require("path");
const db = require("../models");
module.exports = app => {
    const users = require("../controller/user.controller");
    // const passport_local = require("passport-local");

    const router = require("express").Router();

    router.get('/signup', users.signup);
    router.get('/login', users.login);

    // // router.post('/signup', passport.authenticate('local-signup', {
    // //     successRedirect: '/dashboard',
 
    // //     failureRedirect: '/signup'
    // // }
    // ));

    router.get('/dashboard', isLoggedIn, users.dashboard);
 
    router.get('/logout', users.logout);

    // router.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/dashboard',
 
    //     failureRedirect: '/login'
    // }
    // ));

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/login');
 
    }
 
    
}

