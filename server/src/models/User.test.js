const user = require('./User')
const testBeforeHook = require('../lib/test-before-hook')

describe('User Model', function () {
    beforeEach(testBeforeHook)

    it('should create a new user', async () => {
        const username = 'un'
        const password = 'password'
        const newUser = await user.create(username, password)
        expect(newUser).toBeDefined()
        expect(newUser.username).toStrictEqual(username)
        expect(newUser.hashPassword).toBeDefined()
    })

    it('should retrieve a user', async () => {
        const username = 'un'
        const password = 'password'
        const newUser = await user.create(username, password)
        expect(newUser).toBeDefined()
        expect(newUser.username).toStrictEqual(username)
        expect(newUser.hashPassword).toBeDefined()
    })

    it('should get a duplicate key error for two users with the same username', async () => {
        const username = 'un'
        const password = 'password'
        await user.create(username, password)
        try {
            await user.create(username, password)
        } catch (error) {
            console.log(error)
            expect(error).toBeDefined()
        }
    })
})