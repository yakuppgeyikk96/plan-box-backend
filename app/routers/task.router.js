const express = require('express')
const router = new express.Router()
const Task = require('../models/task.model')

router.post('/task', async (req, res) => {
  const task = new Task({ ...req.body, userId: 'abc123' })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.send(error)
  }
})

router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
