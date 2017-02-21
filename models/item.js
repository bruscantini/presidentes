const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user');

const itemSchema = new Schema({
  name: {type: String, required: true},
  category: String,
  picPath: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true},
  description: String,
});

const Item = mongoose.model('Items', itemSchema);
module.exports = Item;
