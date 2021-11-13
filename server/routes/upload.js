const router = require("express-promise-router")();
const cloudinary = require("cloudinary");
const multer = require("multer");
const fs = require("fs");

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
    filename: (req, file, done) => {
        // done(null, req.body.name);
        done(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// router.post("/", upload.single("file"), (req, res, next) => {
//     res.status(200).json("File has been uploaded !");
// });

// upload.array("images") ------ images is a name of key form-data
router.post("/", upload.array("images"), async (req, res) => {
    try {
        let files = req.files;
        const urls = [];
        if (!files)
            return res.status(400).json({ message: "No picture attached!" });

        for (const file of files) {
            const { path } = file;
            const newPath = await cloudinary.v2.uploader.upload(path, {
                resource_type: "auto",
                folder: "Images",
            });
            urls.push(newPath);
            // unlink file in temps directory
            fs.unlinkSync(path);
        }

        res.status(200).json({
            message: "images uploaded successfully",
            data: urls,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;
