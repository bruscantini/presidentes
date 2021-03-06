const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Item     = require('./item');
const Trade    = require('./trade');

const userSchema = new Schema({
  name: String,
  surname: String,
  username: {type: String, required: true},
  password: {type: String, required: true},
  address: String,
  email: {
    type: String,
    lowercase: true },
  phone: String,
  picPath: String,
  items: [{ type: Schema.Types.ObjectId, ref: 'Items'}],
  trades: [{ type: Schema.Types.ObjectId, ref: 'Trades'}]
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
