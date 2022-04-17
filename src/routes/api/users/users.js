const express = require("express");
const checkAuth = require("../../../middlewares/auth/check-authorization");
const router = express.Router();
const userModel = require("../../../models/user");

router.get(
  "/",
  (req, res, next) => checkAuth(req, res, next, true),
  async (req, res) => {
    try {
      const users = await userModel
        .find({})
        .where("phone")
        .ne(req.adminInfo.phone)
        .select("name lastName email phone avatar role")
        .exec();
      if (users) {
        return res
          .status(200)
          .json({ data: users, message: "کاربران با موفقیت دریافت شدند" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ message: "خطایی در دریافت اطلاعات رخ داده است" });
    }
  }
);

module.exports = router;
