const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    attachment: {
        type: Array
    },
    read: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
}, {timestamps: true})

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification