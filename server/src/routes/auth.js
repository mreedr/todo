const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = [{
    description: 'Login to app',
    method: 'post',
    path: '/login',
    auth: false,
    handler: async (req, res) => {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(401).json('username or password was not provided')
        }

        const user = await User.retrieve(req.body.username, req.body.password)

        if (!user) {
            return res.status(404).json('user not found')
        }

        const token = jwt.sign({
            _id: user._id
        }, config.SECRET_TOKEN)

        res.status(200).json({
            user,
            token
        })
    }
}]