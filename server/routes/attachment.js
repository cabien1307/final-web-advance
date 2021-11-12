const router = require('express-promise-router')()

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, 'public/files')
    },
    filename: (req, file, done) =>{
        done(null, req.body.name)
    }
})

const attachment = multer({storage: storage})

router.post('/', attachment.single('file'), (req, res, next) => {
    res.status(200).json("Attachment has been uploaded !")
})

module.exports = router