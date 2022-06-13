const express = require('express')
const router = new express.Router()
const User = require('../models/user.model')

router.post('/user', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateJwtToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)

    const token = await user.generateJwtToken()

    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
