const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = require('../models/roleModel');

const user = new Schema({

  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password1: { type: String },
  password2: { type: String },
  role: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Role'
  },

  //status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
  //confirmCode: { type: String},
  //phoneCode: { type: String,required: false },
  //tokenTemp: { type: String,required: false },
}, { timestamps: true });

module.exports = mongoose.model('users', user)
