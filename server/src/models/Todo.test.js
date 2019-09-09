const todo = require('./Todo')
const testBeforeHook = require('../lib/test-before-hook')

describe('Todo Model', function () {
    beforeEach(testBeforeHook)

    it('should create a todo', async () => {
        const title = 'some title'
        const body = 'some body'
        const newTodo = await todo.create(title, body)
        expect(newTodo).toBeDefined()
        expect(newTodo.title).toStrictEqual(title)
        expect(newTodo.body).toStrictEqual(body)
    })

    it('should retrieve a todo by id', async () => {
        const title = 'some title'
        const body = 'some body'
        const newTodo = await todo.create(title, body)
        const retrievedTodo = await todo.retrieveById(newTodo._id)
        expect(retrievedTodo).toBeDefined()
        expect(retrievedTodo.title).toStrictEqual(title)
        expect(retrievedTodo.body).toStrictEqual(body)
    })

    it('should retrieve all todos', async () => {
        const title = 'some title'
        const body = 'some body'
        await todo.create(title, body)
        const retrievedTodo = await todo.retrieveAll()
        expect(retrievedTodo[0]).toBeDefined()
        expect(retrievedTodo[0].title).toStrictEqual(title)
        expect(retrievedTodo[0].body).toStrictEqual(body)
    })

    it('should update a todo', async () => {
        const title = 'some title'
        const body = 'some body'
        const newTodo = await todo.create(title, body)
        const newTitle = 'new title'
        const updatedTodo = await todo.update(newTodo._id, { title: newTitle })
        expect(updatedTodo).toBeDefined()
        expect(updatedTodo.title).toStrictEqual(newTitle)
        expect(updatedTodo.body).toStrictEqual(body)
    })

    it('should delete a todo', async () => {
        const title = 'some title'
        const body = 'some body'
        const newTodo = await todo.create(title, body)
        const deletedTodo = await todo.delete(newTodo._id)

        expect(deletedTodo).toBeDefined()
        expect(deletedTodo.title).toStrictEqual(title)
        expect(deletedTodo.body).toStrictEqual(body)

        const rTodo = await todo.retrieveById(deletedTodo._id)
        expect(rTodo).toBeNull()
    })
})