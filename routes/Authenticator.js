//Controller
var express       = require('express');
var router        = express.Router();
const User        = require('../models/user');
const Item        = require('../models/item');
const Trade       = require('../models/trade');
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");
const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ITEMS TRADE' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.render("../views/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("../views/signup", { message: "The username already exists" });
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
        res.render("signup", { message: "The username already exists" });
      } else {
        res.redirect("/login");
        }
      });
    });
  });

router.get("/login", (req, res, next) => {
  res.render("routes/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

router.get("/login", (req, res, next) => {
  res.render("views/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
