//Controller
var express       = require('express');
var router        = express.Router();
const User        = require('../models/user');
const Item        = require('../models/item');
const Trade       = require('../models/trade');
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");
const session       = require("express-session");
const MongoStore    = require('connect-mongo')(session);
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const flash         = require("connect-flash");
const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;

router.use(passport.initialize());
router.use(passport.session());
router.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  }));

/* GET home page. */
router.get('/', ensureLogin.ensureLoggedIn('/login'), function(req, res, next) {
  res.redirect('/home');
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "The username already exists" });
      } else {
        res.redirect("/home");
        }
      });
    });
  });

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
