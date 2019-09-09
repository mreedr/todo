const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: 'string',
    body: 'string',
    dateAdded: Date
})
const TodoModel = mongoose.model('Todo', schema)

class Todo {
    async create(title, body) {
        return TodoModel.create({ title, body, dateAdded: Date.now() })
    }

    async retrieveById(id) {
        return TodoModel.findOne({ _id: id })
    }

    async retrieveAll() {
        return TodoModel.find({}).sort([['dateAdded', -1]])
    }

    async update(id, update) {
        return TodoModel.findOneAndUpdate({ _id: id }, update, { new: true, useFindAndModify: false })
    }

    async delete(id) {
        return TodoModel.findOneAndDelete({ _id: id }, { useFindAndModify: false })
    }
}
// export a single instance so new ones don't need to be made
module.exports = new Todo()