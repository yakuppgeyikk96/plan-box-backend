const mongoose = require('mongoose')
const { validateEmail } = require('../utils/validators')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema)
