const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const itemSchema = new Schema({
  name: String,
  category: String,
  pickpath: String,
  owner: [{ type: Schema.Types.ObjectId, ref: 'Users'}],
  description: String,
});

const Item = mongoose.model('Items', itemSchema);
module.exports = Item;
