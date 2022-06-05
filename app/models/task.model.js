const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Task', taskSchema)
