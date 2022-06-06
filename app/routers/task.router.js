const express = require('express')
const router = new express.Router()
const Task = require('../models/task.model')

router.post('/task', async (req, res) => {
  const task = new Task({ ...req.body, userId: 'abc123' })

  const tasksHaveHighestOrder = await Task.find({}).sort({ order: -1 }).limit(1)

  if (tasksHaveHighestOrder.length > 0) {
    const highestOrder = tasksHaveHighestOrder[0].order

    task.order = highestOrder + 1
    console.log(highestOrder)
    console.log(task)
  }

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

router.delete('/task', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.query.id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
