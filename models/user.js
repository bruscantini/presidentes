const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('/item');
const Trade = require('./trade');

const userSchema = new Schema({
  name: String,
  surname: String,
  username: String,
  password: String,
  address: String,
  email: {
    type: String,
    lowercase: true },
  item: [{ type: Schema.Types.ObjectId, ref: 'Item'}],
  trade: [{ type: Schema.Types.ObjectId, ref: 'Trade'}]
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
