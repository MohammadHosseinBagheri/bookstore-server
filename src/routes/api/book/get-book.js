const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const tagModel = require("../../../models/tag");
router.get("/", (req, res) => {
  console.log(req.query["tag"]);
  try {
    bookModel
      .find({})
      .where("status")
      .equals(true)
      .populate("tags")
      .exec((error, result) => {
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
