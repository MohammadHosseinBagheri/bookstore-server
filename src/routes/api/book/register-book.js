const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("salam");
});
module.exports = router;
