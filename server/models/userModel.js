const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = require('../models/roleModel');
const Status = require('../models/statusModel');

const user = new Schema({

  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  password1: { type: String },
  password2: { type: String },
    role: {
    type: Role.schema
   },
    status: {
     type: Status.schema,
     default: 'Pending'
    }

}, { timestamps: true });

module.exports = mongoose.model('users', user)