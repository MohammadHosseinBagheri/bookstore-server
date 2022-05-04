const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const tagModel = require("../../../models/tag");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../../middlewares/auth/check-authorization");
const bookFieldsValidation = require("../../../middlewares/book/book-input-validator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.put(
  "/:id",
  (req, res, next) => checkAuth(req, res, next, true),
  upload.single("picPath"),
  async (req, res) => {
    try {
      let path = undefined;
      const { id: _id } = req.params;
      if (req.file) {
        path = await cloudinary.uploader.upload(
          req?.file?.path,
          { folder: _id },
          function (error, result) {
            if (error) throw error;
            return result;
          }
        );
      }
      const picPath = (await path?.secure_url) || req.body.picPath;
      const book = await bookModel
        .findOneAndUpdate(
          { _id },
          {
            ...req.body,
            picPath,
            userBookDetail: [
              {
                _id,
                percent: 100,
              },
            ],

            // $set: {
            //   "userBookDetail.$[element].detail": {
            //     percent: 100,
            //   },
            // },
          },
          {
            arrayFilters: [{ "element.book": _id }],
            runValidators: true,
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          }
        )
        .exec();
      if (!book) {
        return res.status(404).json({ message: "کتاب مورد نظر وجود ندارد!" });
      } else if (book) {
        return res.status(200).json({ message: "باموفقیت انجام شد!" });
      }
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }
);
module.exports = router;
