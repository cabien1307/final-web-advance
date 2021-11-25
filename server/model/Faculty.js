const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const FacultySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    numRole: {
        type: Number,
        unique: true,
    },
    profilePic: {
        type: String,
        default:
            "https://res.cloudinary.com/dlzptxhoe/image/upload/v1637827055/Images/profile_pic_fewn2d.svg",
    },
    coverPic: {
        type: String,
        default:
            "https://res.cloudinary.com/dlzptxhoe/image/upload/v1637827047/Images/tdtu_lg9z0h.jpg",
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    facebook: {
        type: String,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
    },
});

const Faculty = mongoose.model("Faculty", FacultySchema);
module.exports = Faculty;
