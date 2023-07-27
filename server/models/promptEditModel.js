// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //const User = require('../models/userModel');
// const Category = require('./categoryModel');

// const promptEditSchema = new Schema({
//     name: { type: String },
//     //model: 'text-davinci-edit-001',
//     input: { type: String },
//     instruction: { type: String },
//     response: { type: String }, 
//     category: {
//         type: Category.schema 
//     }
// });

// module.exports = mongoose.model('prompts', promptEditSchema);


// promptEditModel.js

const mongoose = require("mongoose");
const Category = require('./categoryModel');

const promptEditSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  category:{
    type: Category.schema
}
});

const PromptEdit = mongoose.model("PromptEdit", promptEditSchema);

module.exports = PromptEdit;
