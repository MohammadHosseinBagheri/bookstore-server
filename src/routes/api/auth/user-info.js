const express = require("express");
const userInfoTokenCheck = require("../../../middlewares/auth/user-info");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", userInfoTokenCheck, (req, res) => {
  try {
    if (req.token && jwt.decode(req.token)) {
      const decode = jwt.verify(
        req.token,
        "0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d"
      );
      return res.status(200).json({ data: decode });
    } else {
      return res.status(401).json({ message: "unauthorize" });
    }
  } catch (e) {
    return res.status(500).json({ message: "internal error" });
  }
});

module.exports = router;
