const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    postID: { type: Schema.Types.ObjectId, ref: 'Post' },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Comments = mongoose.model('Comment', CommentSchema)
module.exports = Comments