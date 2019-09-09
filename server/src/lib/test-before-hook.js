const mongoose = require('mongoose')
const user = require('../models/User')

module.exports = async () => {
    await mongoose.connect('mongodb://localhost/chainyard-test', { useNewUrlParser: true, useCreateIndex: true })
    await mongoose.connection.db.dropDatabase()
    await user.create('admin', 'password')
}