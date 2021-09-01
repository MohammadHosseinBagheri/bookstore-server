const express = require("express");
const router = express.Router();
const register = require("./auth/register");
const login = require("./auth/login");
router.use("/auth/register", register);
router.use("/auth/login", login);
module.exports = router;
