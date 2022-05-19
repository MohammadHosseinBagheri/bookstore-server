const express = require('express')
const checkAuth = require('../../../middlewares/auth/check-authorization')
const router = express.Router()
const universityModel = require('../../../models/university')
const cities = require('../../../constants/cities')
router.post(
    '/',
    (req, res, next) => checkAuth(req, res, next, false),
    async (req, res) => {
        try {
            const { name, province, city } = req.body
            const isExist = await universityModel
                .findOne({ name, province, city })
                .exec()
            if (isExist) {
                return res
                    .status(409)
                    .json({ message: 'دانشگاه مورد نظر موجو هست !' })
            } else {
                const findedProvince = cities.find(
                    (item) => item.id === province
                )
                const findedCity = findedProvince.cities.find(
                    (item) => item.id === city
                )
                if (!findedProvince || !findedCity)
                    return res.status(404).json({
                        message: 'شهر یا استان را درست وارد کنید!',
                        data: null,
                    })
                const newUniversity = await new universityModel({
                    name,
                    province: findedProvince.id,
                    city: findedCity.id,
                }).save()
                return res.status(201).json({
                    message: 'دانشگاه با موفقیت ثبت شد!',
                    data: newUniversity,
                })
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: e })
        }
    }
)
module.exports = router
