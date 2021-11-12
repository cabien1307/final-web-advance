const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    video: {
        type: String
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty"
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)
module.exports = Post