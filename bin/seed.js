const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcrypt');
const saltRounds = 11;

mongoose.connect("mongodb://localhost/swapper");

const users = [
  {
    username: 'bob',
    password: bcrypt.hashSync('asdf', saltRounds),
    picPath: "http://www.bobmarley.com/wp-content/uploads/2013/10/bob_marley2.jpg"
  },
  {
    username: 'tim',
    password: bcrypt.hashSync('qwer', saltRounds),
    picPath: "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/215.png&w=350&h=254"
  },
  {
    username: 'alice',
    password: bcrypt.hashSync('zxcv', saltRounds),
    picPath: 'https://i.ytimg.com/vi/jt7AF2RCMhg/hqdefault.jpg'
  },
];

User.create(users, function (err, userDocs) {
  if (err) return console.log(err);
  let userIds = userDocs.map((x) => {
    return x._id;
  });
  Item.create({name: 'hat', picPath: 'http://www.thinkgeek.com/images/products/zoom/11af_4th_doctors_hat.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[0]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[0], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
  Item.create({name: 'baseball bat', picPath: 'http://assets.academy.com/mgen/93/10070393.jpg?is=500,500',
    description: 'sdflkas jasdk  jasdfk als lasl lasl  jsakdj lasdk j jiijsdffgsdfglkLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[1]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[1], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
  Item.create({name: 'lord of the rings', picPath: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTEyMjAwMDU1OV5BMl5BanBnXkFtZTcwNDQyNTkxMw@@._V1_.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[2]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[2], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
  Item.create({name: 'superman action figure', picPath: 'http://www.my-family-fun.com/pictures/superman-action-figure-1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[0]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[0], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
  Item.create({name: 'bookbag', picPath: 'http://www.theproductpromoter.com/wp-content/uploads/2015/11/jansport-superbreak-bookbag.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[1]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[1], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
  Item.create({name: 'leather jacket', picPath: 'https://www.angeljackets.com/product_images/m/591/brown-leather-jackets__94060_zoom2__28282_std.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[2]}, (err, doc) => {
      if (err) return console.log(err);

      User.findByIdAndUpdate(userIds[2], {$push: {items: doc._id}}, (err, updatedUser) =>{
        if (err) console.log(err);

      });

      console.log(doc.name);
    });
    Item.create({name: 'belt', picPath: 'https://www.crossbreedholsters.com/Portals/0/Hotcakes/Data/products/ab986827-9e5b-4757-a80a-72e3680188e4/medium/Gun-Belt-a.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[0]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[0], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);
      });
    Item.create({name: 'daffy duck poster', picPath: 'http://imgc.allpostersimages.com/images/P-473-488-90/71/7115/WMRV100Z/posters/looney-tunes-daffy-duck-television-poster.jpg',
      description: 'sdflkas jasdk  jasdfk als lasl lasl  jsakdj lasdk j jiijsdffgsdfglkLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[1]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[1], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);
      });
    Item.create({name: 'playboy pijamas', picPath: 'https://s-media-cache-ak0.pinimg.com/564x/22/b1/87/22b1878bd5b3d85651e875277dec31a2.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[2]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[2], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);
      });
    Item.create({name: 'little red slippers', picPath: 'http://images4-b.ravelrycache.com/uploads/tinlou/169301007/4-2_medium.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[0]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[0], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);
      });
    Item.create({name: 'iMac Computer', picPath: 'https://images-na.ssl-images-amazon.com/images/I/91bGcrFfMOL._SX425_.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[1]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[1], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);
      });
    Item.create({name: 'bicycle', picPath: 'http://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_fixie_fixed_gear_ashton_4_large.jpg?v=1473721341',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[2]}, (err, doc) => {
        if (err) return console.log(err);

        User.findByIdAndUpdate(userIds[2], {$push: {items: doc._id}}, (err, updatedUser) =>{
          if (err) console.log(err);

        });

        console.log(doc.name);

      });
      setTimeout(function(){
        mongoose.connection.close();
      }, 6000);
});
