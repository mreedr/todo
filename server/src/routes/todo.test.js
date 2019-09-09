const app = require('../app')
const supertest = require('supertest')
const testBeforeHook = require('../lib/test-before-hook')

describe('Todo Routes', function () {
    beforeEach(testBeforeHook)

    it('should fail without token', async () => {
        return supertest(await app)
            .get('/todos')
            .expect(401)
            .expect('Content-Type', /json/)
    })

    it('should succeed with valid token', async () => {
        const localApp = await app

        const loginRes = await supertest(localApp)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const token = loginRes.body.token

        const res = await supertest(localApp)
            .get(`/todos?token=${token}`)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(res.body).toStrictEqual([])
    })

    it('should add a todo', async () => {
        const todoTitle = 'sometitle'
        const todoBody = 'some body of the todo'

        const localApp = await app

        const loginRes = await supertest(localApp)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const token = loginRes.body.token

        await supertest(localApp)
            .post(`/todos?token=${token}`)
            .send({
                title: todoTitle,
                body: todoBody
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const getTodoRes = await supertest(localApp)
            .get(`/todos?token=${token}`)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(getTodoRes.body[0]).toBeDefined()
        expect(getTodoRes.body[0]).toHaveProperty('title')
        expect(getTodoRes.body[0]).toHaveProperty('body')
        expect(getTodoRes.body[0].title).toStrictEqual(todoTitle)
        expect(getTodoRes.body[0].body).toStrictEqual(todoBody)
    })

    it('should update an existing todo', async () => {
        const todoTitle = 'sometitle'
        const todoBody = 'some body of the todo'

        const localApp = await app

        const loginRes = await supertest(localApp)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const token = loginRes.body.token

        const addTodoRes = await supertest(localApp)
            .post(`/todos?token=${token}`)
            .send({
                title: todoTitle,
                body: todoBody
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const newTitle = 'new title'
        const newBody = 'new body'
        const getTodoRes = await supertest(localApp)
            .put(`/todos/${addTodoRes.body._id}?token=${token}`)
            .send({
                title: newTitle,
                body: newBody
            })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(getTodoRes.body).toBeDefined()
        expect(getTodoRes.body.title).toStrictEqual(newTitle)
        expect(getTodoRes.body.body).toStrictEqual(newBody)
    })

    it('should partially update an existing todo', async () => {
        const todoTitle = 'sometitle'
        const todoBody = 'some body of the todo'

        const localApp = await app

        const loginRes = await supertest(localApp)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const token = loginRes.body.token

        const addTodoRes = await supertest(localApp)
            .post(`/todos?token=${token}`)
            .send({
                title: todoTitle,
                body: todoBody
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const newTitle = 'new title'
        const getTodoRes = await supertest(localApp)
            .put(`/todos/${addTodoRes.body._id}?token=${token}`)
            .send({ title: newTitle })
            .expect(200)
            .expect('Content-Type', /json/)

        expect(getTodoRes.body).toBeDefined()
        expect(getTodoRes.body.title).toStrictEqual(newTitle)
        expect(getTodoRes.body.body).toStrictEqual(todoBody)
    })

    it('should delete an existing todo', async () => {
        const todoTitle = 'sometitle'
        const todoBody = 'some body of the todo'

        const localApp = await app

        const loginRes = await supertest(localApp)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const token = loginRes.body.token

        const addTodoRes = await supertest(localApp)
            .post(`/todos?token=${token}`)
            .send({
                title: todoTitle,
                body: todoBody
            })
            .expect(200)
            .expect('Content-Type', /json/)

        const deleteTodoRes = await supertest(localApp)
            .delete(`/todos/${addTodoRes.body._id}?token=${token}`)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(deleteTodoRes.body).toBeDefined()
        expect(deleteTodoRes.body._id).toStrictEqual(addTodoRes.body._id)
    })
})