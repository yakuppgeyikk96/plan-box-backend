const validator = require('validator')

const validateEmail = function (value) {
  return validator.isEmail(value)
}

module.exports = { validateEmail }
