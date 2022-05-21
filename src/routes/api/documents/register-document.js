const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const docModel = require('../../../models/document')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const collegeModel = require('../../../models/college')
var mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })
router.post(
    '/',
    upload.single('picPath'),
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            console.log(req.file)
            if (req.file) {
                const { name, author, field, college } = req.body

                path = await cloudinary.uploader.upload(
                    req?.file?.path,
                    { folder: college },
                    function (error, result) {
                        if (error) throw error
                        return result
                    }
                )
                const newDocument = await new docModel({
                    name,
                    author,
                    source: path?.secure_url,
                    field,
                    college,
                })
                console.log(newDocument?._id.toString())
                await newDocument.save()
                await collegeModel.findByIdAndUpdate(
                    college,
                    { $push: { documents: newDocument._id.toString() } },
                    function (err) {
                        if (err) throw err
                    }
                ).clone()
                return res.status(201).json({ data: newDocument })
            } else {
                return res
                    .status(400)
                    .json({ message: 'فیلد را به درستی وارد کنید' })
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e })
        }
    }
)

module.exports = router
