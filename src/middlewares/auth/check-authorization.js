const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    if (headers) {
      const token = headers.split(" ")[1];
      if (token) {
        const decode = jwt.verify(
          token,
          "0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d"
        );
        if (decode) next();
        else {
          throw "unauthorize";
        }
      } else {
        throw "unauthorize";
      }
    } else {
      throw "unauthorize";
    }
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};
module.exports = checkAuth;
