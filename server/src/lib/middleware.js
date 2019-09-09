const jwtMiddleware = require('express-jwt')
const config = require('config')

exports.unauthorizedError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json('invalid token...')
    }
}

exports.internalServerError = (err, req, res, next) => {
    if (err) {
        res.status(500).json('Internal Server Error')
    }
}

// checkAuth is based off: https://gist.github.com/thebigredgeek/230368bd92aa19e3f6638b659edf5cef
exports.checkAuth = jwtMiddleware({
    secret: config.SECRET_TOKEN,
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
            // Handle token presented as a Bearer token in the Authorization header
            return req.headers.authorization.split(' ')[1]
        } else if (req.query && req.query.token) {
            // Handle token presented as URI param
            return req.query.token
        } else if (req.cookies && req.cookies.token) {
            // Handle token presented as a cookie parameter
            return req.cookies.token
        }
        // If we return null, we couldn't find a token.
        // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
        return null
    }
})