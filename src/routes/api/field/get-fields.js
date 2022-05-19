const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const fieldModel = require('../../../models/field')

router.get(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { university } = req.query
            if (university) {
                const universitiesFields = await fieldModel
                    .find({ university: university })
                    .exec()
                return res.status(200).json({ data: universitiesFields })
            }
            const allFields = await fieldModel.find({}).exec()
            return res.status(200).json({ data: allFields })
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
)
module.exports = router
