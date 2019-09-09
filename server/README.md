**Install**
`$ yarn`

**Test**
Not every path has been tested but most of the main functionality of the service are tested. Test files are located with their corresponding server files.
`$ yarn test`

**Add A User**
Since we only want our "Pointy-haired-boss" to be able to use this application, we need a way to generate a user.
`$ yarn addUser`

**Run**
Starting the server in development mode will cause it to restart whenever we make any changes.
`$ yarn dev`

Starting the server in production mode
`$ yarn start`

**Design**
The main design decision was to define the routes as javascript objects. This makes adding new routes much easier and also gives us an api to include common functionality across routes. The main one being adding an `auth: true` param to the route definitions. Additionally, this pattern decouples the route handler function from where it is added to the express app (`app[method](/* handler */)`). This makes the handlers more unit testable.

If given more time I would have liked to change the way deleting works. It would be more useful to have the "Todos" to be soft deleted. This way the user could see all previous "Todos" they had completed and also have the ability to undelete if desired.

Lastly I am using the CommonJS `require` pattern for this project. I didn't feel like bringing in a build step was necessary given the requirements. 