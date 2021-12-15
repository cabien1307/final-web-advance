const router = require('express-promise-router')()
const { schemas, validateBody, validateParams } = require('../middleware/validateRouter')
const commentController = require('../controller/comment')

router.get('/',commentController.getAllComment)
router.get('/:postID/comment-of-post', validateParams(schemas.idSchema, 'postID'), commentController.getCommentOfPost)
// router.get('/:commentID',validateParams(schemas.idSchema, 'commentID') ,commentController.getCommentByID)
router.post('/',validateBody(schemas.commentSchema) ,commentController.createComment)
router.patch('/:commentID',validateParams(schemas.idSchema, 'commentID'), validateBody(schemas.commentSchema) ,commentController.updateComment)
router.delete('/:commentID', validateParams(schemas.idSchema, 'commentID'), validateBody(schemas.commentDeleteSchema) ,commentController.deleteComment)

module.exports = router