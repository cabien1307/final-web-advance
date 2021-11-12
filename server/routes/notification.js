const router = require('express-promise-router')()
const { schemas, validateBody, validateParams } = require('../middleware/validateRouter')
const notificationController = require('../controller/notification')

router.get('/', notificationController.getAllNotification)

router.get('/new', notificationController.getNewNotification)
// set read/get unread
router.get('/:userID/unread', validateParams(schemas.idSchema, 'userID'), notificationController.getNotificationUnread)
router.patch('/:notifyID/read', validateParams(schemas.idSchema, 'notifyID'), validateBody(schemas.notificationDeleteSchema), notificationController.setNotificationRead)

// Get notify by ID
router.get('/:notifyID', validateParams(schemas.idSchema, 'notifyID'), notificationController.getNotificationByID)

// Get notify by ID
router.get('/:slug/faculty', notificationController.getNotificationByFaculty)

// Create
router.post('/:userID/create', validateParams(schemas.idSchema, 'userID'), validateBody(schemas.notificationSchema), notificationController.createNotification)

// Update
router.patch('/:notifyID', validateParams(schemas.idSchema, 'notifyID'), validateBody(schemas.notificationUpdateSchema), notificationController.updateNotification)

// Delete
router.delete('/:notifyID', validateParams(schemas.idSchema, 'notifyID'), validateBody(schemas.notificationDeleteSchema), notificationController.deleteNotification)

module.exports = router