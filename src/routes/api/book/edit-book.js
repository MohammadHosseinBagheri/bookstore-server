const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const tagModel = require("../../../models/tag");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../../middlewares/auth/check-authorization");
const bookFieldsValidation = require("../../../middlewares/book/book-input-validator");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.put("/:id", checkAuth, upload.single("picPath"), async (req, res) => {
  try {
    const { id: _id } = req.params;
    const picPath = `/upload/${req?.file?.originalname}` || req.body.picPath;
    const book = await bookModel
      .findByIdAndUpdate(
        _id,
        { ...req.body, picPath },
        {
          runValidators: true,
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
});
module.exports = router;
