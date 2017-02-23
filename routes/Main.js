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

router.get("/trades", (req, res, next) => {
  const user = req.user;
  user.populate({path: 'trades', populate: {path: 'user1 user2 items2'}}, function (err, userObj){
    res.render('trades', {layout: 'layouts/home-layout', user: userObj});
  });
});

// Security issue: Anybody can access this page if they're logged in,
// even if they aren't part of the trade.
router.get("/trade/:id", (req, res, next) => {
  const tradeId = req.params.id;
  const userId = req.user.id;
  Trade.findById(tradeId).populate('user1 user2 items1 items2').exec((err, trade) => {
    console.log('trade', trade);
    if(!trade.user1._id.equals(userId) && !trade.user2._id.equals(userId)){
      console.log("Hey, you shouldn't be here. You're not part of this trade!");
      res.redirect('/home');
    }
    res.render('trade-details', {layout: 'layouts/home-layout', trade, userId});
  });
});

router.get("/addToTrade/:itemId", (req, res, next) => {
  const currentUser = req.user;
  // for refactoring, we can use the currentUser.save instead of searching db

  // get item object
  Item.findById(req.params.itemId).exec((err, item) => {
    if (err) return next(err);
    //console.log('the item object, ', item);

    //get owner object of item
    User.findById(item.owner).populate('trades').exec((err, owner) => {
      if (err) return next(err);
      if (currentUser.id === owner.id){
        console.log("current user is owner of Item. No Trade!");
        return res.redirect('/home');
      }
      //console.log('the owner: ', owner);
      //console.log("the owner's trades: ", owner.trades);
      // search owner's trades to see if one exists between owner and currentUser.
      let oldTrade = owner.trades.find(function (trade) {
        return (trade.user1.equals(currentUser.id) || trade.user2.equals(currentUser.id));
      });
      if (oldTrade){
        // owner has a trade with currentUser already!
        console.log('owner already has a trade with current User!');
        if (oldTrade.user1.equals(owner.id)){
          // owner is user1 in the trade.
          console.log('owner is user1 in the trade');
          Trade.findByIdAndUpdate(oldTrade.id, {$addToSet: {items1: item.id}}, {new: true}, (err, updatedTrade) =>{
            if (err) return next(err);
            console.log('updated trade: ', updatedTrade);
          });
        } else {
          // owner is user2 in the trade.
          console.log('owner is user2 in the trade');
          Trade.findByIdAndUpdate(oldTrade.id, {$addToSet: {items2: item.id}}, {new: true}, (err, updatedTrade) =>{
            if (err) return next(err);
            console.log('updated trade: ', updatedTrade);
          });
        }
      } else {
        // make a new trade between currentUser and owner.
        console.log('making a new trade between these users.');
        const newTrade = new Trade({status: 'NEW', user1: currentUser.id, user2: owner.id, items2: [item.id]});
        newTrade.save((err, tradeDoc) => {
          if (err) return next(err);
          //console.log('trade added to db', tradeDoc);
          User.findByIdAndUpdate(currentUser.id, {$push: {trades: tradeDoc.id}}, {new: true}, (err, user1Doc) => {
            console.log('updated user1', user1Doc);
          });
          User.findByIdAndUpdate(owner.id, {$push: {trades: tradeDoc.id}}, {new: true}, (err, user2Doc) => {
            console.log('item.owner.id', owner.id);
            console.log('updated user2', user2Doc);
          });
        });
      }
      res.redirect('/trades');
    });
  });
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
