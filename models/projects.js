const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const projectsSchema = new Schema({
    name: String,
    complete: Boolean,
    subItems: Boolean,
    subItemID: Number,
    id: Number
})

module.exports = Mongoose.model('projects', projectsSchema)
