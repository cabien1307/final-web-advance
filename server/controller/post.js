const Post = require('../model/Post')
const User = require('../model/User')
const Faculty = require('../model/Faculty')

class postController {
    
    // [GET] /post/
    async getAllPost(req, res, next) {
        const posts = await Post.find()
            .populate('userID')
            .populate('faculty')
            .populate(
                {
                    path: 'comments',
                    populate: {
                        path: "userID"
                    },
                    options: { sort: { 'createdAt': -1 } }
                }
            )
            .sort({ 'createdAt': -1 });

        return res.status(200).json(posts)
    }

    // [GET] /post/:postID
    async getPostByID(req, res, next) {
        const { postID } = req.value.params
        const post = await Post.findById(postID)

        if (post) {
            return res.status(200).json(post)
        } else {
            return res.status(404).json("Post not found !")
        }

    }

    // [GET] /post/:userID/timeline
    async getPostTimeline(req, res, next) {
        const { userID } = req.value.params
        const postTimeLine = await Post.find({ userID }).populate('userID')
            .populate(
                {
                    path: 'comments',
                    populate: {
                        path: "userID"
                    },
                    options: { sort: { 'createdAt': -1 } }
                }
            )
            .sort({ 'createdAt': -1 }); //other case User.findOne({ userID: userID })

        // const posts = await Post.find({ userID: user._id })
        return res.status(200).json(postTimeLine)
    }

    async getPostBySlug(req, res, next) {
        const { slug } = req.params;
        const faculty = await Faculty.findOne({ slug: slug })

        const posts = await Post.find({ faculty: faculty._id }).populate('userID')
            .populate(
                {
                    path: 'comments',
                    populate: {
                        path: "userID"
                    },
                    options: { sort: { 'createdAt': -1 } }
                }
            )
            .populate('faculty')
            .sort({ 'createdAt': -1 })

        return res.status(200).json(posts)
    }

    // [POST] /post/
    async createPost(req, res, next) {
        const { userID } = req.value.body

        const user = await User.findById(userID)
        if (user) {
            const newPost = new Post(req.value.body)
            await newPost.save();

            await user.update({ $push: { posts: newPost._id } })

            return res.status(201).json({
                success: true
            })
        } else {
            return res.status(404).json("user not found")
        }

    }

    // [PATCH] /post/:postID
    async updatePost(req, res, next) {
        const { postID } = req.value.params
        const { userID } = req.value.body
        const post = await Post.findById(postID)

        // console.log(postID, userID, post.userID.toString());

        if (userID === post.userID.toString()) {
            await post.updateOne({ $set: req.value.body })
            return res.status(200).json("The post has been updated !")
        } else {
            return res.status(403).json("You can update only your post !")
        }

    }

    // [DELETE] /post/:postID
    async deletePost(req, res, next) {
        const { postID } = req.value.params;
        const { userID } = req.value.body;
        const post = await Post.findById(postID);
        const user = await User.findById(userID)

        console.log(post._id);

        // return res.status(200).json(user)

        if (userID === post.userID.toString()) {

            await post.deleteOne()
            await user.update({ $pull: { posts: post._id } })
            // pull post array in user 
            return res.status(200).json("The post has been deleted")
        } else {
            return res.status(403).json("You can delete only your post !")
        }
    }

    // [PUT] /post/:postID/liked
    async likedPost(req, res, next) {
        const { postID } = req.value.params
        const { userID } = req.value.body
        const post = await Post.findById(postID)

        if (!post.likes.includes(userID)) {
            await post.updateOne({ $push: { likes: userID } }, { new: true });
            return res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: userID } }), { new: true };
            return res.status(200).json("The post has been disliked");
        }
    }


}

module.exports = new postController