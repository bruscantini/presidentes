const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Item     = require('./item');
const User     = require('./user');

const tradeSchema = new Schema({
  status: {type: String, enum: ['NEW', 'ACTIVE', 'COMPLETE'], required: true},
  user1: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
  user2: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
  items1: [{ type: Schema.Types.ObjectId, ref: 'Items'}],
  items2: [{ type: Schema.Types.ObjectId, ref: 'Items', required: true}]
});

const Trade = mongoose.model('Trades', tradeSchema);
module.exports = Trade;
