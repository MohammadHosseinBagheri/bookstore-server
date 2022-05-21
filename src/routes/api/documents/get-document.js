const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const collegeModel = require('../../../models/college')
const docModel = require('../../../models/document')

router.get(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { fieldId, collegeId } = req.query
            if (
                typeof fieldId === 'undefined' ||
                typeof collegeId === 'undefined'
            ) {
                return res
                    .status(400)
                    .json({ message: 'رشته یا درس به درستی وارد نشده است' })
            }
            if (collegeId !== '') {
                const isCollegeExist = await collegeModel
                    .findById(collegeId)
                    .exec()
                if (!isCollegeExist) {
                    return res.status(404).json({ message: 'کالج وجود ندارد!' })
                }
                const collegesDocs = await docModel
                    .find({ college: collegeId })
                    .populate('field')
                    .populate('college')
                    .exec()
                return res.status(200).json({ data: collegesDocs })
            }
            if (collegeId === '' && fieldId !== '') {
                const isFieldExist = await collegeModel
                    .find({ field: fieldId })
                    .exec()
                if (!isFieldExist) {
                    return res.status(404).json({ message: 'کالج وجود ندارد!' })
                }
                const collegesDocs = await docModel
                    .find({ field: fieldId })
                    .populate('field')
                    .populate('college')
                    .exec()
                return res.status(200).json({ data: collegesDocs })
            }
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
)

module.exports = router
