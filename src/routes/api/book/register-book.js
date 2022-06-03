const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");
const bookFieldsValidation = require("../../../middlewares/book/book-input-validator");
const bookModel = require("../../../models/book");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post("/", upload.single("image"), bookFieldsValidation(),async (req, res) => {
  try {
    const { name, description, writer, status, tags, price, content } = req.body;
    

    const image = req.file;
    const errors = validationResult(req);
    if (!image) {
      return res.status(400).json({ errors: "عکسی انتخاب نشده است!" });
    } else if (!errors.isEmpty()) {
      let err = [];
      for (let error in errors.errors) {
        err.push(errors.errors[error].msg);
      }
      return res.status(400).json({ errors: err });
    }
    let path = undefined;
      if (req.file) {
        path = await cloudinary.uploader.upload(
          req?.file?.path,
          { folder: "books" },
          function (error, result) {
            if (error) throw error;
            return result;
          }
        );
      }
      const picPath = (await path?.secure_url) || req.body.picPath;
    new bookModel({
      name,
      description,
      writer,
      status,
      price,
      content,
      picPath,
      tags,
    }).save();
    return res.status(201).json({ message: "باموفقیت انجام شد!" });
  } catch (e) {
    return res.status(500).json({ message: "مشکلی پیش آمده است!" });
  }
});
module.exports = router;
