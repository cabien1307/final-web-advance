const router = require('express-promise-router')()
const { schemas, validateBody, validateParams } = require('../middleware/validateRouter')

const postController = require('../controller/post')

router.get('/', postController.getAllPost)
router.get('/faculty/:slug', postController.getPostBySlug)
router.get('/:postID', validateParams(schemas.idSchema, 'postID'), postController.getPostByID)
router.get('/:userID/timeline', validateParams(schemas.idSchema, 'userID'), postController.getPostTimeline)
router.post('/', validateBody(schemas.postSchema), postController.createPost)
router.delete('/:postID', validateParams(schemas.idSchema, 'postID'), validateBody(schemas.postDeleteSchema), postController.deletePost)
router.patch('/:postID', validateParams(schemas.idSchema, 'postID'), validateBody(schemas.postUpdateSchema), postController.updatePost)
router.put('/:postID/liked', validateParams(schemas.idSchema, 'postID'),validateBody(schemas.postDeleteSchema) , postController.likedPost)

module.exports = router