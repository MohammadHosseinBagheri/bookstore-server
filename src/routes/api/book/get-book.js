const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const tagModel = require("../../../models/tag");
router.get("/", (req, res) => {
  try {
    bookModel.find({}, (error, result) => {
      if (error) throw new Error(error);
      else {
        return res.status(200).json({ data: result });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "internal error" });
  }
});
module.exports = router;
