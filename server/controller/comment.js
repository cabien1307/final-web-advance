const Comment = require('../model/Comment')
const Post = require('../model/Post')
const User = require('../model/User')

class commentController {

    // [GET] /comment/
    async getAllComment(req, res, next) {
        const comments = await Comment.find()
        return res.status(200).json(comments)
    }

    // [GET] /post/:postID/comment-of-post
    async getCommentOfPost(req, res, next) {
        const { postID } = req.value.params
        console.log(postID);
        const allPost = await Comment.find({postID: postID}).populate('userID')
        return res.status(200).json(allPost)
    }

    //[GET] /comment/:commentID
    async getCommentByID(req, res, next) {
        const { commentID } = req.value.params
        const comment = await Comment.findById(commentID)
        if (comment) {
            return res.status(200).json(comment)
        } else {
            return res.status(404).json("Comment not found !")
        }

    }

    //[POST] /comment/
    async createComment(req, res, next) {
        const { postID, userID } = req.value.body
        const post = await Post.findById(postID)
        const user = await User.findById(userID)

        if (user && post) {
            const newComment = new Comment(req.value.body)
            await newComment.save()

            // post.comments.push(newComment._id)
            // await post.save()
            await post.update({ $push: { comments: newComment._id } })

            return res.status(201).json({
                success: true
            })
        } else {
            return res.status(404).json("User/post not found !")
        }

    }

    //[PATCH] /comment/:commentID
    async updateComment(req, res, next) {
        const { commentID } = req.value.params
        const comment = await Comment.findById(commentID)
        const { userID, postID } = req.value.body
        const postOfComment = await Post.findById(postID)

        // Check whether user's comment 
        if (userID === comment.userID) {

            // Check whether comment's post 
            if (postOfComment) {

                await comment.updateOne({ $set: req.value.body })
                return res.status(200).json("The comment has been updated !");

            } else {
                return res.status(403).json("The post doesn't exist!")
            }

        } else {
            return res.status(403).json("You can update only your comment!");
        }

        return res.status(200).json(comment)
    }

    //[DELETE]  /comment/:commentID
    async deleteComment(req, res, next) {
        const { commentID } = req.value.params
        const { userID, postID } = req.value.body

        const comment = await Comment.findById(commentID)

        if (userID === comment.userID) { //check whether user's comment
            const postOfComment = await Post.findById(postID)

            // check whether comment's post
            if (postOfComment && postOfComment._id.toString() === comment.postID.toString()) {
                await comment.deleteOne()

                await postOfComment.update({ $pull: { comments: comment._id } })
                return res.status(200).json("The comment has been deleted !")
            } else {
                return res.status(200).json("The post doesn't exist or your comment not in this post !")
            }
        } else {
            return res.status(403).json("You can delete only you comment!")
        }


    }
}

module.exports = new commentController