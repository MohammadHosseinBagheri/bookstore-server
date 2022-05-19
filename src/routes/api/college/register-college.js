const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const collegeModel = require('../../../models/college')
const fieldModel = require('../../../models/field')

router.post(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { name, field } = req.body
            if (!name || !field) {
                return res
                    .status(400)
                    .json({ message: 'رشته یا نام را به درستی وارد نکرده اید' })
            }
            const isFieldExist = await fieldModel.findById(field).exec()
            if (!isFieldExist) {
                return res
                    .status(400)
                    .json({ message: 'رشته را به درستی وارد نکرده اید' })
            }

            const newCollege = await new collegeModel({
                name,
                field,
            })
            await newCollege.save()
            return res.status(201).json({ newCollege })
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
)
module.exports = router
