const Post = require("../model/Post");
const User = require("../model/User");
const Faculty = require("../model/Faculty");
const Comments = require("../model/Comment");

class postController {
    // [GET] /post/
    async getAllPost(req, res, next) {
        const posts = await Post.find()
            .populate("userID likes")
            .populate("faculty")
            .populate({
                path: "comments",
                populate: {
                    path: "userID",
                },
                options: { sort: { createdAt: -1 } },
            })
            .sort({ createdAt: -1 });

        return res
            .status(200)
            .json({ msg: "Success!", result: posts.length, posts });
    }

    // [GET] /post/:postID
    async getPostByID(req, res, next) {
        const { postID } = req.value.params;
        const post = await Post.findById(postID);

        if (post) {
            return res.status(200).json(post);
        } else {
            return res.status(404).json("Post not found !");
        }
    }

    // [GET] /post/:userID/timeline
    async getPostTimeline(req, res, next) {
        const { userID } = req.value.params;
        const postTimeLine = await Post.find({ userID })
            .populate("userID likes")
            .populate({
                path: "comments",
                populate: {
                    path: "userID",
                },
                options: { sort: { createdAt: -1 } },
            })
            .sort({ createdAt: -1 }); //other case User.findOne({ userID: userID })

        // const posts = await Post.find({ userID: user._id })
        return res.status(200).json(postTimeLine);
    }

    // [GET] /faculty/:slug
    async getPostBySlug(req, res, next) {
        const { slug } = req.params;
        const faculty = await Faculty.findOne({ slug: slug });

        const posts = await Post.find({ faculty: faculty._id })
            .populate("userID likes")
            .populate({
                path: "comments",
                populate: {
                    path: "userID",
                },
                options: { sort: { createdAt: -1 } },
            })
            .populate("faculty")
            .sort({ createdAt: -1 });

        return res.status(200).json(posts);
    }

    // [POST] /post/
    async createPost(req, res, next) {
        const { userID } = req.value.body;

        const user = await User.findById(userID);
        if (user) {
            const newPost = new Post(req.value.body);
            await newPost.save();

            await user.update({ $push: { posts: newPost._id } });

            return res.status(201).json({
                success: true,
                newPost,
            });
        } else {
            return res.status(404).json("user not found");
        }
    }

    // [PATCH] /post/:postID
    async updatePost(req, res, next) {
        const { postID } = req.value.params;
        const { userID, title, img } = req.value.body;
        const post = await Post.findById(postID)
            .populate("userID likes")
            .populate("faculty")
            .populate({
                path: "comments",
                populate: {
                    path: "userID",
                },
                options: { sort: { createdAt: -1 } },
            })
            .sort({ createdAt: -1 });

        // console.log(postID, userID, post.userID.toString());

        if (userID === post.userID._id.toString()) {
            await post.updateOne({ $set: req.value.body });
            return res.status(200).json({
                msg: "Updated Post!",
                newPost: {
                    ...post._doc,
                    title,
                    img,
                },
            });
        } else {
            return res.status(403).json("You can update only your post !");
        }
    }

    // [DELETE] /post/:postID
    async deletePost(req, res, next) {
        const { postID } = req.value.params;
        const { userID } = req.value.body;
        const post = await Post.findById(postID);
        const user = await User.findById(userID);

        if (userID === post.userID.toString()) {
            await post.deleteOne();

            // pull post array in user
            await user.update({ $pull: { posts: post._id } });

            // Delete comment of post
            const comment = await Comments.find({ postID: post._id });
            if (comment.length > 0) {
                await Comments.deleteMany({ postID: post._id });
            }

            return res.status(200).json("The post has been deleted");
        } else {
            return res.status(403).json("You can delete only your post !");
        }
    }

    // [PUT] /post/:postID/liked
    async likedPost(req, res, next) {
        const { postID } = req.value.params;
        const { userID } = req.value.body;
        const post = await Post.findById(postID);

        if (!post.likes.includes(userID)) {
            await post.updateOne({ $push: { likes: userID } }, { new: true });
            return res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: userID } }), { new: true };
            return res.status(200).json("The post has been disliked");
        }
    }
}

module.exports = new postController();
