//Controller
var express       = require('express');
var router        = express.Router();
const User        = require('../models/user');
const Item        = require('../models/item');
const Trade       = require('../models/trade');
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
});

router.use(ensureLogin.ensureLoggedIn('/login'));

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
  const itemId = req.params.id;
  Item.findById(itemId, (err, item) => {
    if (err) return next(err);
    return res.render('item', {layout: "layouts/home-layout",
                                item});
  });

});

router.get('/add', (req, res, next) => {
  res.render('add', { layout: "layouts/home-layout"
});
});

router.post('/add', upload.single('item-picture'), (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const filename = req.file.filename;
  const owner = req.user.id;

  Item.save(
    {name, description, picPath: `/uploads/${filename}`, owner},
      (err) => {
    if (err) return next(err);
  });
});

module.exports = router;
