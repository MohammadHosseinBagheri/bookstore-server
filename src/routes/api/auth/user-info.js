const express = require('express')
const userInfoTokenCheck = require('../../../middlewares/auth/user-info')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../../../models/user')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const { json } = require('body-parser')

router.post('/', userInfoTokenCheck, (req, res) => {
    try {
        if (req.token && jwt.decode(req.token)) {
            const decode = jwt.verify(
                req.token,
                '0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d'
            )
            return res.status(200).json({ data: decode })
        } else {
            return res.status(401).json({ message: 'unauthorize' })
        }
    } catch (e) {
        return res.status(500).json({ message: 'internal error' })
    }
})
router.put(
    '/:id',
    (req, res, next) => checkAuth(req, res, next, true),
    (req, res) => {
        try {
            const { id } = req.params
            userModel
                .findByIdAndUpdate(
                    id,
                    { ...req.body },
                    {
                        runValidators: true,
                        upsert: true,
                    }
                )
                .exec()
            return res.status(200).json({ message: 'باموفقیت' })
        } catch (e) {
            return res.status(500).json({ message: 'internal error' })
        }
    }
)

module.exports = router
