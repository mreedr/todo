const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')
const helmet = require('helmet')
const config = require('config')

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN')
    res.header('Access-Control-Allow-Origin', config.clientDomain)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    next()
})

async function start() {
    await mongoose.connect(
        `mongodb://localhost/chainyard-${process.env.NODE_ENV}`,
        { useNewUrlParser: true, useCreateIndex: true }
    )
    await routes.init(app, mongoose)
    if (process.env.NODE_ENV !== 'test') app.listen(config.port)
    return app
}

module.exports = start()