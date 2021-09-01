const express = require("express");
const { validationResult } = require("express-validator");
const tagFieldsValidation = require("../../../middlewares/book/tag-input-validator");
const tagModel = require("../../../models/tag");

const router = express.Router();
router.post("/", tagFieldsValidation(), (req, res) => {
  const { name, tagType } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err = [];
      for (let error in errors.errors) {
        err.push(errors.errors[error].msg);
      }
      return res.status(400).json({ errors: err });
    }
    new tagModel({
      name,
      tagType,
    }).save();
    return res.status(201).json({ message: "created" });
  } catch (e) {
    return res.status(500).json({ message: "internal error" });
  }
});
module.exports = router;
