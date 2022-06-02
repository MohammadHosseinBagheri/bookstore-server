const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const userModel = require("../../../models/user");
const tagModel = require("../../../models/tag");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../../middlewares/auth/check-authorization");
const userBookDetailModel = require("../../../models/user-book-detail");

router.get("/", async (req, res) => {
  try {
    const headers = req.headers["authorization"];
    if (headers) {
      const headers = req.headers["authorization"];
      const token = headers.split(" ")[1];
      if (token) {
        const decode = jwt.verify(
          token,
          "0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d"
        );
        if (decode) {
          if (decode?.role !== "admin") {
            bookModel
              .find({})
              .populate("tags")
              .exec((error, result) => {
                if (error) throw error;
                else {
                  return res.status(200).json({
                    data: result
                  });
                }
              });
          } else {
            const result = await bookModel
              .find({}).where("status").ne(false)
              .populate("tags")
              .exec();
            const recentlyReadedBook = await userBookDetailModel.find({
              phone: decode?.phone
            }).populate("bookId").exec()
            return res.status(200).json({
              data: result,
              recentlyReadedBook
            });

          }
        } else {
          throw "unauthorize";
        }
      }
    } else {
      const books = bookModel
        .find({})
        .where("status")
        .equals(true)
        .populate("tags")
        .exec((error, result) => {
          if (error) throw error;
          else {
            return res.status(200).json({
              data: result
            });
          }
        });
    }
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
});

router.get(
  "/:id",
  function (req, res, next) {
    req.headers["authorization"] ? checkAuth(req, res, next) : next();
  },
  async (req, res) => {
    try {
      const {
        id
      } = req.params;
      let book = await bookModel
        .findById(id)
        .populate("tags")
        .select(
          "writer name picPath price description status boughtCount rate rateCount tags content"
        )
        .exec()
        .catch((e) => {
          throw e;
        });

      if (req.headers["authorization"]) {
        let tags = await tagModel.find({}, "name").exec();
        const {
          _id: userId
        } = await userModel
          .findOne({
            phone: req.decode.phone || req.decode.phone
          })
          .select("_id")
          .exec();
        const bookDetail = await userBookDetailModel
          .findOne({
            bookId: id,
            userId: String(userId),
          })
          .select("isFavorite isBought percent")
          .exec();
        return res.status(200).json({
          data: {
            tags,
            book,
            bookDetail
          },
        });
      } else {
        return res.status(200).json({
          data: {
            book
          },
        });
      }
    } catch (e) {
      return res.status(500).json({
        message: e
      });
    }
  }
);
module.exports = router;