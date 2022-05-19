const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const fieldModel = require('../../../models/field')

router.post(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { name, university } = req.body
            const newField = await new fieldModel({
                name,
                university,
            })
            await newField.save()
            return res.status(201).json({ newField })
        } catch (e) {
            return res.status(500).json({ message: e })
        }
    }
)
module.exports = router
