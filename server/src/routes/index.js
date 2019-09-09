const fs = require('fs')
const util = require('util')
const middleware = require('../lib/middleware')

const readdir = util.promisify(fs.readdir)

exports.init = async (app) => {
    // import all route files
    const files = await readdir(__dirname)
    const routeFiles = files.filter(f => f.match(/^((?!test|index).)*$/g))
    // initialize routes
    for (const fileName of routeFiles) {
        const routes = require(`./${fileName}`)
        for (const route of routes) {
            // if the route requires authentication then add jwt middleware
            if (route.auth) {
                app.use(route.path, middleware.checkAuth)
            }
            app[route.method.toLowerCase()](route.path, route.handler)
        }
    }

    // add error handling for unauthorized access
    app.use(middleware.unauthorizedError)

    // catch all
    app.use(middleware.internalServerError)
}