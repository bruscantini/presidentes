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

router.get('/', (req, res, next) => {
  res.render('landing', {layout: "layouts/main-layout"});
});

router.get('/home', (req, res, next) => {
  Item.find((err, items) => {
    if (err){
      return next(err);
    }
    return res.render('home', {layout: "layouts/home-layout",
                        items });
  });
});

router.get('/item/:id', (req, res, next) => {
  const itemId = req.params.id;
  Item
    .findById(itemId)
    .populate('owner')
    .exec ((err, item) => {
    if (err) return next(err);
    return res.render('item', {layout: "layouts/home-layout",
                                item, owner: item.owner});
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
  const itemToAdd = new Item({name, description, picPath: `/uploads/${filename}`, owner});

  itemToAdd.save((err, item) => {
    if (err) return next(err);
    console.log(item);
    User.findByIdAndUpdate(owner, {$push: {items: item}}, {new: true}, (err, user) => {
      console.log('user with item', user);
    });
  });
  return res.redirect('/home');
});

router.get('/profile/:id', (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId,(err, user) => {
    if (err) return next(err);
    return res.render('profile', {layout: "layouts/home-layout",
                              items: user.items, user});
  });
});

router.get('/profile', (req, res, next) => {
  const user = req.user;
  User.findById(user, (err, user) => {
    if (err) return next(err);
    return res.render('profile', {layout: "layouts/home-layout", items: user.items, user});
  });
});

module.exports = router;
