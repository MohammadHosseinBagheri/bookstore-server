const express = require("express");
var mongoose = require("mongoose");
const checkAuth = require("../../../middlewares/auth/check-authorization");
const router = express.Router();

const userBookDetail = require("../../../models/user-book-detail");
const userModel = require("../../../models/user");

const objectId = mongoose.Types.ObjectId;

router.put(
  "/:bookId",
  (req, res, next) => checkAuth(req, res, next, false),
  async (req, res) => {
    try {
      const { bookId } = req.params;
      const { _id: userId } = await userModel
      .findOne({ phone: req.decode.phone })
      .select("_id")
      .exec();
      if (!objectId.isValid(bookId)) {
        return res
        .status(400)
        .json({ message: "پارامتر های ای دی اشتباه است!" });
      }
      const bookDetail = await userBookDetail
        .findOneAndUpdate(
          {
            bookId: bookId,
            userId: String(userId),
          },
          { userId: userId, bookId, ...req.body },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        .exec();
      return res.status(200).json({ message: "باموفقیت انجام شد!" });
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }
);

module.exports = router;
