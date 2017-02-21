const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Item     = require('./item');
const User     = require('./user');

const tradeSchema = new Schema({
  title: {type: String, required: true},
  status: {type: String, enum: ['new', 'active', 'complete'], required: true},
  user1: { type: Schema.Types.ObjectId, ref: 'Users'},
  user2: { type: Schema.Types.ObjectId, ref: 'Users'},
  item: [{ type: Schema.Types.ObjectId, ref: 'Items'}],
});

const Trade = mongoose.model('Trades', tradeSchema);
module.exports = Trade;
