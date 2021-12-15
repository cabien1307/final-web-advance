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

    // Catch 404 and forward handler
    app.use((req, res, next) => {
        const err = new Error('Not found !')
        err.status = 404;
        next(err)
    })
    // Error handle function
    app.use((err, req, res, next) => {
        const error = app.get('env') === 'development' ? err : {}
        const status = err.status || 500

        return res.status(status).json({
            error: {
                message: error.message
            }
        })
    })

}

module.exports = route;