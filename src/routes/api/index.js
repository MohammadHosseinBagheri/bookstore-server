const express = require("express");
const router = express.Router();
const register = require("./auth/register");
const login = require("./auth/login");
const registerBook = require("./book/register-book");
//auth
router.use("/auth/register", register);
router.use("/auth/login", login);
//book
router.use("/book/register", registerBook);
module.exports = router;
