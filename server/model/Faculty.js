const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug);

const FacultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numRole: {
        type: Number,
        unique: true,
    }
    ,
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    facebook: {
        type: String
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
})

const Faculty = mongoose.model('Faculty', FacultySchema)
module.exports = Faculty