const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const User = require('../models/userModel');
const Category = require('./categoryModel');

const promptImageModel = new Schema({

    name: { type: String },
    prompt: { type: String },
    response: {type: String},
    n: {type: Number},
    size: { type: String },
    url1: {type: String},
    url2: {type: String},
      category:{
          type: Category.schema
      }
},);

module.exports = mongoose.model('prompts', promptImageModel)