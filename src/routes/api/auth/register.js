const express = require("express");
const registerAuthMiddleware = require("../../../middlewares/auth/register");
const userModel = require("../../../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../../../helper/jwt");
const saltRounds = 10;

const router = express.Router();
router.post("/", registerAuthMiddleware(), (req, res) => {
  const { name, lastName, password, phone, email } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = [];
      for (let error in errors.errors) {
        err.push(errors.errors[error].msg);
      }
      return res.status(400).json({ errors: err });
    }
    userModel.find({ email }, (error, result) => {
      if (error) throw new Error(error);
      else if (result.length !== 0) {
        return res.status(400).json({ message: "this user is not new" });
      } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          new userModel({
            name,
            lastName,
            password: hash,
            phone,
            email,
          }).save();
        });
        return res.status(201).json({
          refToken: generateRefreshToken({
            name,
            lastName,
            password,
            phone,
            email,
          }),
          accessToken: generateAccessToken({
            name,
            lastName,
            password,
            phone,
            email,
          }),
        });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "internal error" });
  }
});
module.exports = router;
