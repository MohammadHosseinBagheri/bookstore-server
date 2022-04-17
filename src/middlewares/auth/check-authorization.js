const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next, adminCheck = false) => {
  try {
    const headers = req.headers["authorization"];
    if (headers) {
      const token = headers.split(" ")[1];
      if (token) {
        const decode = jwt.verify(
          token,
          "0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d"
        );
        if (decode) {
          req.decode = decode;
          if (adminCheck) {
            if (decode.role === "admin") {
              req.adminInfo = decode;
              next();
            } else {
              return res
                .status(403)
                .json({ message: "شما به این صفحه دسترسی ندارید!" });
            }
          } else {
            next();
          }
        } else {
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
