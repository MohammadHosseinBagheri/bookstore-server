const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const cities = require('../../../constants/cities')

router.get(
    '/',
    (req, res, next) => checkAuth(req, res, next, true),
    (req, res) => {
        try {
            const { province } = req.query
            if (province) {
                const allProvince = cities.find((item) => item.id === province)
                return res.status(200).json({ data: allProvince })
            } else {
                const allProvince = cities.map((item) => ({
                    id: item.id,
                    name: item.name,
                }))
                return res.status(200).json({ data: allProvince })
            }
        } catch (e) {
            console.log(typeof e)
            return res.status(500).json({ message: e })
        }
    }
)

module.exports = router
