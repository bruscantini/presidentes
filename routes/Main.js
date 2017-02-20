//Controller
var express       = require('express');
var router        = express.Router();
const User        = require('../models/user');
const Item        = require('../models/item');
const Trade       = require('../models/trade');
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");

router.use(ensureLogin.ensureLoggedIn('/login'));

router.get('/home', (req, res, next) => {
  res.render('example');
});

module.exports = router;
