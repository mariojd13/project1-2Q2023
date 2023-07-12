const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/userModel');
const Category = require('../models/categoryModel');

const prompt = new Schema({

    name: { type: String },
    input: { type: String },
    instructions: { type: String },
    tempure: { type: String },
    user: {
        type: User.schema
    },
    category:{
        type: Category.schema
    }
},);

module.exports = mongoose.model('prompts', prompt)