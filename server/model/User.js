const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String,
    },
    role: {
        type: Number,
        enum: [0, 1, 2],
        default: 2 //0 admin....1 teacher....2 student
    },
    listRolePost: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
    }],
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        default: null
    },
    major: {
        type: String
    },
    class: {
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    authType: {
        type: String,
        enum: ["local", "facebook", "google"],
        default: "local"
    },
    authFacebookID: {
        type: String,
        default: null
    },
    authGoogleID: {
        type: String,
        default: null
    },
    authTwitterID: {
        type: String,
        default: null
    }

}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    try {
        if (this.authType !== 'local') next();

        

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const passwordHash = await bcrypt.hash(this.password, salt)

        // Re-assign hash
        this.password = passwordHash;

        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User