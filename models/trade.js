const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Item     = require('./item');
const User     = require('./user');

const tradeSchema = new Schema({
  title: String,
  status: String,
  user1: [{ type: Schema.Types.ObjectId, ref: 'Users'}],//user1: userSchema,
  user2: [{ type: Schema.Types.ObjectId, ref: 'Users'}],//user2: [userSchema],
  item: [{ type: Schema.Types.ObjectId, ref: 'Items'}],
});

const Trade = mongoose.model('Trades', tradeSchema);
module.exports = Trade;
