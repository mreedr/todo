const mongoose = require('mongoose')
const user = require('../src/models/User')

async function start() {
    await mongoose.connect(
        `mongodb://localhost/chainyard-${process.env.NODE_ENV}`,
        { useNewUrlParser: true, useCreateIndex: true }
    )
    await user.create('admin', 'password')
    process.exit()
}
start()