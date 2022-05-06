const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const universityModel = require('../../../models/university')

router.get(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const universities = await universityModel.find({}).exec()
            return res.status(200).json({ data: universities })
        } catch (e) {
            return res.status(500).json({ data: null, message: e })
        }
    }
)

module.exports = router
