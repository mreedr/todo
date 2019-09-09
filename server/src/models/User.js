const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    hashPassword: 'string' // salted
})
const UserModel = mongoose.model('User', schema)

class User {
    async create(username, password) {
        const hash = await bcrypt.hash(password, saltRounds)
        return UserModel.create({
            username,
            hashPassword: hash
        })
    }

    async retrieve(username, password) {
        const user = await UserModel.findOne({ username })
        if (user) {
            const isSame = await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.hashPassword, (err, res) => {
                    if (err) return reject(err)
                    resolve(res)
                })
            })
            if (isSame) return user
        }
        return null
    }
}
// export a single instance so new ones don't need to be made
module.exports = new User()