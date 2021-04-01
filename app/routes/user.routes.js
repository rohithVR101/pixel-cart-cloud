const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const db = require("../models");

module.exports = (app) => {
  const users = require("../controller/user.controller");
  app.use(passport.initialize());
  app.use(passport.session());
  const router = require("express").Router();

  const auth = () => {
    return (req, res, next) => {
      passport.authenticate("local", (error, user, info) => {
        if (error) res.status(400).json({ statusCode: 200, message: error });
        req.login(user, function (error) {
          if (error) return next(error);
          next();
        });
      })(req, res, next);
    };
  };

  const isLoggedIn = (req, res, next) => {
    console.log("session ", req.session);
    if (req.isAuthenticated()) {
      //console.log('user ', req.session.passport.user)
      return next();
    }
    return res
      .status(400)
      .json({ statusCode: 400, message: "not authenticated" });
  };

  passport.use(
    new LocalStrategy(function (username, password, done) {
      if (username === "9876543210" && password === "admin") {
        return done(null, username);
      } else {
        return done("unauthorized access", false);
      }
    })
  );

  passport.serializeUser(function (user, done) {
    if (user) done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, id);
  });

  router.post("/authenticate", auth(), (req, res) => {
    console.log(req);
    res.status(200).json({ statusCode: 200, message: "hello" });
  });

  router.get("/getData", isLoggedIn, (req, res) => {
    res.json("data is");
  });

  app.use("/api/user", router);
};
