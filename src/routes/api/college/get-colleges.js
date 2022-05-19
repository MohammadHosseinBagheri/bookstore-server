const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const collegeModel = require('../../../models/college')
const fieldModel = require('../../../models/field')

router.get(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { field } = req.query
            if (!field) {
                return res
                    .status(400)
                    .json({ message: 'رشته را به درستی وارد نشده است' })
            }
            const isFieldExist = await fieldModel.findById(field).exec()
            if (!isFieldExist) {
                return res
                    .status(404)
                    .json({ message: 'رشته مورد نظر وجود ندارد.' })
            }
            const colleges = await collegeModel
                .find({ field })
                .populate({
                    path: 'field',
                    populate: {
                        path: 'university',
                    },
                })
                .exec()
            return res.status(200).json({ data: colleges })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: e })
        }
    }
)
module.exports = router
