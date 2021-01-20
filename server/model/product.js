const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ProductsScheme = new Schema({
  //author: ObjectId,
  coverimage: String,
  name:{type: String, required: true, max:[60,'最大60文字までです']},
  price: Number,
  description: String,
  heading1: String,
  headingmessage1: String,
  heading2: String,
  headingmessage2: String,
  heading3: String,
  headingmessage3: String,
  heading4: String,
  headingmessage4: String,
});

module.exports = mongoose.model('product',ProductsScheme);