const router = require("express-promise-router")();
const cloudinary = require("cloudinary");
const multer = require("multer");
const fs = require("fs");
const  { cloud } = require("../config/cloudinary");

cloudinary.v2.config({
    cloud_name: cloud.name,
    api_key: cloud.api_key,
    api_secret: cloud.api_secret,
});

const storage = multer.diskStorage({
    filename: (req, file, done) => {
        done(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


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
