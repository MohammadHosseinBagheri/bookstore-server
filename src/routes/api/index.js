const express = require('express')
const router = express.Router()
const register = require('./auth/register')
const login = require('./auth/login')
const userInfo = require('./auth/user-info')
const registerBook = require('./book/register-book')
const registerTag = require('./book/register-tag')
const getBook = require('./book/get-book')
const removeBook = require('./book/remove-book')
const editBook = require('./book/edit-book')
const users = require('./users/users')
const userBookDetail = require('./auth/user-book-detail')
const getUniversities = require('./university/get-university')
const postUniversities = require('./university/register-university')
const getProvince = require('./province/get-province')
//users
router.use('/users', users)
//auth
router.use('/auth/user-book-detail', userBookDetail)
router.use('/auth/register', register)
router.use('/auth/login', login)
router.use('/auth/user/info', userInfo)
//book
router.use('/book/register', registerBook)
router.use('/book/get', getBook)
router.use('/book', removeBook)
router.use('/book', editBook)
//tag
router.use('/tag/register', registerTag)
//university
router.use('/university', getUniversities)
router.use('/university', postUniversities)
//province
router.use('/province', getProvince)

module.exports = router
