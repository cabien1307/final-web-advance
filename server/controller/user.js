const User = require('../model/User')
const Faculty = require('../model/Faculty')
const JWT = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/token/index')

const encodeToken = (userID) => {
    return JWT.sign({
        iss: "CaBien",
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, JWT_SECRET)
}

class UserController {

    // [GET] user/
    async getAll(req, res, next) {
        const user = await User.find();
        return res.status(200).json(user)
    }

    // [POST] user/sign-up
    async signUp(req, res, next) {
        const { email } = req.value.body;

        const foundUser = await User.findOne({
            $and: [
                { email }, { authType: "local" }
            ]
        });
        if (foundUser) return res.status(401).json("Email is already exist !")

        const newUser = new User(req.value.body);
        await newUser.save();

        // Encode token
        const token = encodeToken(newUser._id);
        res.setHeader('Authorization', token)
        return res.status(201).json({
            success: true,
        })
    }

    // [GET] user/:id
    async getUserByID(req, res, next) {
        const { id } = req.value.params

        const user = await User.findById(id).populate('listRolePost').populate('faculty');
        const { password, posts, authFacebookID, authTwitterID, authGoogleID, ...others } = user._doc
        return res.status(200).json(others)
    }

    // [GET] user/role
    async getUserByRole(req, res, next) {
        const users = await User.find({ $or: [{ role: 1 }, { role: 0 }] })
        return res.status(200).json(users)
    }

    // [POST] user/sign-in
    async signIn(req, res, next) {
        const token = encodeToken(req.user._id)
        res.setHeader('Authorization', token)
        return res.status(200).json({
            success: true,
        })
    }

    //[POST] /user/secret
    async secret(req, res, next) {
        console.log('Call to secret function !');
        return res.status(200).json({ resource: true })

    }

    //[POST] /auth/google
    async authGoogle(req, res, next) {
        const token = encodeToken(req.user._id)
        res.setHeader('Authorization', token)
        const user = req.user
        return res.status(200).json({
            success: true,
            user
        })
    }

    //[POST] /auth/facebook
    async authFacebook(req, res, next) {
        const token = encodeToken(req.user._id)
        res.setHeader('Authorization', token)
        return res.status(200).json({
            success: true
        })
    }

    // [PUT] /:id/replace
    async replaceUser(req, res, next) {
        const { id } = req.value.params;
        console.log(id);
        const newUser = req.value.body;
        const result = await User.findOneAndReplace(id, newUser, { new: true })

        return res.status(200).json({
            action: 'success',
            data: result
        })
    }

    // [PATCH] /:id/update
    async updateUser(req, res, next) {
        const { id } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(id, newUser, { new: true }).populate('listRolePost').populate('faculty');
        const { password, posts, authFacebookID, authTwitterID, authGoogleID, ...others } = result._doc
        return res.status(200).json({
            action: 'success',
            data: others
        })
    }

    // [PATCH] /:id/updateRole
    async updateRole(req, res, next) {
        const { userID } = req.value.params
        const { listRolePost, username } = req.body

        console.log(username);
        await User.findByIdAndUpdate({ _id: userID }, { $set: { listRolePost }, username: username} )

        return res.status(202).json({
            success: true
        })
    }

    // [DELETE] /:userID/delete
    async deleteUser(req, res, next) {
        const { userID } = req.value.params
        const result = await User.findByIdAndDelete(userID)
        return res.status(200).json({
            action: 'success',
            result
        })
    }

    // [GET] /:teacherID/get-role-teacher
    async getRoleTeacher(req, res, next) {
        const { teacherID } = req.value.params
        const teacher = await User.findById(teacherID).populate('listRolePost')
        return res.status(200).json(teacher.listRolePost)
    }

    // [PATCH] /:teacherID/set-role-teacher
    async setRoleTeacher(req, res, next) {
        const { teacherID } = req.value.params
        const { listRolePost } = req.value.body
        const teacher = await User.findById(teacherID)
        const faculty = await Faculty.find({ numRole: listRolePost })


        if (teacher) {
            // {$pull: {listRolePost: {$exists: true}}}
            await teacher.update(
                { $set: { listRolePost: faculty } },
                { new: true }
            )
            return res.status(200).json(
                { "Success": true }
            )
        } else {
            return res.status(404).json("Teacher not found !")
        }

    }
}

module.exports = new UserController