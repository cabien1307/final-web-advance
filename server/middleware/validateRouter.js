const Joi = require('@hapi/joi');

// PARAM
const validateParams = (schema, name) => {
    return (req, res, next) => {
        const validateResult = schema.validate({ param: req.params[name] })

        if (validateResult.error) { //error
            return res.status(400).json(validateResult.error)
        } else {
            if (!req.value) req.value = {} // create req.value = {} if doesn't exist            
            if (!req.value['params']) req.value.params = {} // create req.value.params = {} if doesn't exist    

            req.value.params[name] = validateResult.value.param// attach params after validate from request into req.value.params[name]
            next()
        }
    }
}

// BODY
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)

        if (result.error) { //error
            return res.status(400).json(result.error)
        } else {
            if (!req.value) req.value = {} //create req.value = {} if req.value doesn't exist
            if (!req.value['body']) req.value.body = {} //create req.value.body = {} if req.value.body doesn't exist

            req.value.body = result.value  // attach body after validate from request into req.value.body
            next()
        }
    }
}

// Schema
const schemas = {
    // params
    idSchema: Joi.object().keys({
        param: Joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
    }),

    // POST (sign-up, )
    userSchema: Joi.object().keys({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().max(20).min(6).required(),
        role: Joi.number(),
        listRolePost: Joi.string(),
    }),

    // PUT user (replace)
    userReplaceSchema: Joi.object().keys({
        username: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        birthday: Joi.date().required(),
        class: Joi.string().required(),
        major: Joi.string().required(),
        faculty: Joi.string().required(),
    }),

    // PATCH user (update)
    userUpdateSchema: Joi.object().keys({
        username: Joi.string().min(2).max(50),
        email: Joi.string().email(),
        birthday: Joi.date(),
        class: Joi.string(),
        major: Joi.string(),
        faculty: Joi.string(),
        profilePic: Joi.string(),
        coverPic: Joi.string(),
        role: Joi.number(),
        listRolePost: Joi.array(),
    }),

    // POST user (login)
    authSignInSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    }),

    // PATCH list-role
    userListRolePost: Joi.object().keys({
        listRolePost: Joi.array()
    }),

    // POST faculty (create)
    facultySchema: Joi.object().keys({
        name: Joi.string().required(),
        profilePic: Joi.string(),
        coverPic: Joi.string(),
        phone: Joi.string(),
        email: Joi.string().email(),
        facebook: Joi.string(),
    }),

    // PATCH faculty (update)
    facultyUpdateSchema: Joi.object().keys({
        name: Joi.string(),
        profilePic: Joi.string(),
        coverPic: Joi.string(),
        phone: Joi.string(),
        email: Joi.string().email(),
        facebook: Joi.string(),
        numRole: Joi.number()
    }),

    // POST notification (create)
    notificationSchema: Joi.object().keys({
        title: Joi.string().required(),
        faculty: Joi.string().required(),
        content: Joi.string(),
        attachment: Joi.string(),
        read: Joi.string(),
    }),

    // PATCH notification (update)
    notificationUpdateSchema: Joi.object().keys({
        userID: Joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        title: Joi.string(),
        faculty: Joi.string(),
        content: Joi.string(),
        attachment: Joi.string(),
    }),

    // DELETE notification
    notificationDeleteSchema: Joi.object().keys({
        userID: Joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),

    // POST post (create)
    postSchema: Joi.object().keys({
        userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string().required(),
        img: Joi.string(),
        video: Joi.string(),
        faculty: Joi.string(),
        likes: Joi.string(),
        comments: Joi.string()
    }),

    // DELETE post
    postDeleteSchema: Joi.object().keys({
        userID: Joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),

    // PATCH post (update)
    postUpdateSchema: Joi.object().keys({
        userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string(),
        img: Joi.string(),
        video: Joi.string(),
        faculty: Joi.string(),
        likes: Joi.string(),
        comments: Joi.string()
    }),

    // POST comment (Create)
    commentSchema: Joi.object().keys({
        postID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        content: Joi.string()
    }),

    // DELETE comment
    commentDeleteSchema: Joi.object().keys({
        userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        postID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

}

module.exports = {
    validateParams,
    validateBody,
    schemas
}