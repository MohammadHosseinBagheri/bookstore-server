const express = require("express");
const loginAuthMiddleware = require("../../../middlewares/auth/login");
const userModel = require("../../../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../../../helper/jwt");
const router = express.Router();

router.post("/", loginAuthMiddleware(), (req, res) => {
  const { phone, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = [];
      for (let error in errors.errors) {
        err.push(errors.errors[error].msg);
      }
      return res.status(400).json({ errors: err });
    } else {
      userModel.findOne({ phone }, (error, result) => {
        if (error) throw new Error("مشکلی به وجود آموده است!");
        else if (!result) {
          return res.status(404).json({ message: "این نام کاربری ثبت نام نکرده است!" });
        } else if (result) {
          const crackPassword = bcrypt.compareSync(password, result.password);
          if (crackPassword) {
            return res.status(200).json({
              refToken: generateRefreshToken({
                name: result.name,
                phone: result.phone,
                email: result.email,
                lastName: result.lastName,
                role:result.role
              }),
              accessToken: generateAccessToken({
                name: result.name,
                phone: result.phone,
                email: result.email,
                lastName: result.lastName,
                role:result.role
              }),
            });
          } else {
            return res
              .status(401)
              .json({ message: "نام کاربری یا رمز عبور اشتباه است!" });
          }
        }
      });
    }
  } catch (e) {
    res.status(500).json({ message: "internal error" });
  }
});

module.exports = router;
