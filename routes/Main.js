//Controller
var express       = require('express');
var router        = express.Router();
const User        = require('../models/user');
const Item        = require('../models/item');
const Trade       = require('../models/trade');
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");

//router.use(ensureLogin.ensureLoggedIn('/login'));

router.get('/home', (req, res, next) => {
  Item.find((err, items) => {
    if (err){
      return next(err);
    }
    console.log(items);
    return res.render('home', {layout: "layouts/home-layout",
                        items });
  });
});

router.get('/item/:id', (req, res, next) => {
  res.render('item', {layout: "layouts/home-layout"});
});

module.exports = router;
