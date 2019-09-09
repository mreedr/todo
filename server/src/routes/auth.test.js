const app = require('../app')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const config = require('config')

const testBeforeHook = require('../lib/test-before-hook')

describe('Auth Routes', () => {
    beforeEach(testBeforeHook)

    it('should fail with no credentials', async () => {
        return supertest(await app)
            .post('/login')
            .set('Accept', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)
    })

    it('should fail with incorect credentials', async () => {
        return supertest(await app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'invalidUN',
                password: 'invalidPW'
            })
            .expect(404)
            .expect('Content-Type', /json/)
    })

    it('should succed with valid credentials', async () => {
        const res = await supertest(await app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                username: 'admin',
                password: 'password'
            })
            .expect(200)
            .expect('Content-Type', /json/)
        const decoded = await jwt.verify(res.body.token, config.SECRET_TOKEN)
        expect(decoded).toHaveProperty('_id')
        expect(decoded).toHaveProperty('iat')
    })
})