// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //const User = require('../models/userModel');
// const Category = require('./categoryModel');

// const prompEditModel = new Schema({

//     name: { type: String },
//     mondel: 'text-davinci-edit-001',
//     input: {type: String},
//     instruction: {type: String},
//       category:{
//           type: Category.schema
//       }
// },);

// module.exports = mongoose.model('prompts', prompEditModel)

// promptEditModel.js

const mongoose = require("mongoose");

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
});

const PromptEdit = mongoose.model("PromptEdit", promptEditSchema);

module.exports = PromptEdit;
