/* src/routes/todo.js */
const Todo = require('../models/Todo')

module.exports = [{
    path: '/todos',
    method: 'get',
    description: 'Get todos',
    auth: true,
    handler: async (req, res) => {
        try {
            const todos = await Todo.retrieveAll()
            res.status(200).json(todos)
        } catch (error) {
            res.status(400).json('Failed to retrive todos')
        }
    }
}, {
    path: '/todos',
    method: 'post',
    description: 'Add a todo',
    auth: true,
    handler: async (req, res) => {
        if (!req.body || !req.body.title || !req.body.body) {
            return res.status(400).json('Todo is missing title or body')
        }
        try {
            const todo = await Todo.create(req.body.title, req.body.body)
            res.status(200).json(todo)
        } catch (error) {
            res.status(400).json('Failed to add a todo')
        }
    }
}, {
    path: '/todos/:id',
    method: 'put',
    description: 'Update a todo',
    auth: true,
    handler: async (req, res) => {
        try {
            const todo = await Todo.update(req.params.id, req.body)
            res.status(200).json(todo)
        } catch (error) {
            res.status(400).json('Failed to update')
        }
    }
}, {
    path: '/todos/:id',
    method: 'delete',
    description: 'delete a todo',
    auth: true,
    handler: async (req, res) => {
        try {
            const todo = await Todo.delete(req.params.id, req.body)
            res.status(200).json(todo)
        } catch (error) {
            res.status(400).json(`Failed to delete todo ${req.params.id}`)
        }
    }
}]