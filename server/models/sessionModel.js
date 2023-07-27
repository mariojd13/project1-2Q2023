const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session = new Schema({
  token: { type: String },
  email: { type: String },
  expire: { type: Date }
});

module.exports = mongoose.model('sessions', session);