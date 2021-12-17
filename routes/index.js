const userRoute = require('./user')
const facultyRoute = require('./faculty')
const notificationRoute = require('./notification')
const commentRoute = require('./comment')
const postRoute = require('./post')
const uploadRoute = require('./upload')
const attachmentRoute = require('./attachment')

function route(app) {
    
    app.use('/user', userRoute)
    app.use('/faculty', facultyRoute)
    app.use('/notification', notificationRoute)
    app.use('/comment', commentRoute)
    app.use('/post', postRoute)
    app.use('/upload', uploadRoute)
    app.use('/attachment', attachmentRoute)



}

module.exports = route;