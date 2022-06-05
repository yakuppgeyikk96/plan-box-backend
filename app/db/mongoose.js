const mongoose = require('mongoose')
const dbConfig = require('../config/db.config')

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => console.log('MongoDB connection successful'))
  .catch((error) => console.log('MongoDB Error: ' + error))
