const mongoose = require('mongoose')
const { validateEmail } = require('../utils/validators')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.methods.generateJwtToken = async function () {
  const user = this

  const token = jwt.sign({ _id: user._id.toString() }, 'l0x7x5tpuh19')
  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

/**
 * Validate user email and password
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) throw new Error('Unable to login')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new Error('Unable to login')

  return user
}

/**
 * Encrypt password before saving
 */
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
