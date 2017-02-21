const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcrypt');
const saltRounds = 11;

mongoose.connect("mongodb://localhost/swapper");

const users = [
  {
    username: 'bob',
    password: bcrypt.hashSync('asdf', saltRounds)
  },
  {
    username: 'tim',
    password: bcrypt.hashSync('qwer', saltRounds)
  },
  {
    username: 'alice',
    password: bcrypt.hashSync('zxcv', saltRounds)
  },
];

User.create(users, function (err, userDocs) {
  if (err) return console.log(err);
  let userIds = userDocs.map((x) => {
    console.log(x.username, x._id);
    return x._id;
  });
  Item.create({name: 'hat', picPath: 'http://lorempixel.com/400/200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[0]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
  Item.create({name: 'baseball bat', picPath: 'http://lorempixel.com/400/200',
    description: 'sdflkas jasdk  jasdfk als lasl lasl  jsakdj lasdk j jiijsdffgsdfglkLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[1]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
  Item.create({name: 'lord of the rings', picPath: 'http://lorempixel.com/400/200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[2]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
  Item.create({name: 'superman action figure', picPath: 'http://lorempixel.com/400/200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[0]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
  Item.create({name: 'bookbag', picPath: 'http://lorempixel.com/400/200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[1]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
  Item.create({name: 'leather jacket', picPath: 'http://lorempixel.com/400/200',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: userIds[2]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'belt', picPath: 'http://lorempixel.com/400/200',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[0]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'daffy duck poster', picPath: 'http://lorempixel.com/400/200',
      description: 'sdflkas jasdk  jasdfk als lasl lasl  jsakdj lasdk j jiijsdffgsdfglkLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[1]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'playboy pijamas', picPath: 'http://lorempixel.com/400/200',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[2]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'little red slippers', picPath: 'http://lorempixel.com/400/200',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[0]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'iMac Computer', picPath: 'http://lorempixel.com/400/200',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[1]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name);});
    Item.create({name: 'bicycle', picPath: 'http://lorempixel.com/400/200',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      owner: userIds[2]}, (err, doc) => {if (err) return console.log(err); console.log(doc.name); mongoose.connection.close();});
      console.log('at end');
});
