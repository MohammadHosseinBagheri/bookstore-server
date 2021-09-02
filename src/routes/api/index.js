const express = require("express");
const router = express.Router();
const register = require("./auth/register");
const login = require("./auth/login");
const registerBook = require("./book/register-book");
const registerTag = require("./book/register-tag");
const getBook = require("./book/get-book");
//auth
router.use("/auth/register", register);
router.use("/auth/login", login);
//book
router.use("/book/register", registerBook);
router.use("/book/get", getBook);
//tag
router.use("/tag/register", registerTag);
module.exports = router;
