const express = require("express");
const router = express.Router();
const register = require("./auth/register");
const login = require("./auth/login");
const registerBook = require("./book/register-book");
const registerTag = require("./book/register-tag");
//auth
router.use("/auth/register", register);
router.use("/auth/login", login);
//book
router.use("/book/register", registerBook);
//tag
router.use("/tag/register", registerTag);
module.exports = router;
