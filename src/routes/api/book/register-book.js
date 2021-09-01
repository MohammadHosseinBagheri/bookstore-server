const express = require("express");
const { validationResult } = require("express-validator");
const multer = require("multer");
const bookFieldsValidation = require("../../../middlewares/book/book-input-validator");
const bookModel = require("../../../models/book");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post("/", upload.single("image"), bookFieldsValidation(), (req, res) => {
  const { name, description, writer, status, tags } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = [];
      for (let error in errors.errors) {
        err.push(errors.errors[error].msg);
      }
      return res.status(400).json({ errors: err });
    }
    new bookModel({
      name,
      description,
      writer,
      status,
      picPath: `/upload/${req.file.originalname}`,
      tags,
    }).save();
    return res.status(201).json({ message: "created" });
  } catch (e) {
    return res.status(500).json({ message: "internal error" });
  }
});
module.exports = router;