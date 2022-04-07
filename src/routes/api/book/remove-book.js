const express = require("express");
const router = express.Router();
const bookModel = require("../../../models/book");
const checkAuth = require("../../../middlewares/auth/check-authorization");

router.delete("/:id", checkAuth, (req, res) => {
  try {
    const { id } = req.params;
    bookModel.findByIdAndDelete(id, { strict: true }, (err, result) => {
      if (err) throw err;
      if (!result) {
        res.status(404).json({ message: "کتاب با این مشخصات یافت نشد" });
      } else {
        res
          .status(200)
          .json({ message: `کتاب ${result.name} باموفقیت پاک شد!` });
      }
    });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
