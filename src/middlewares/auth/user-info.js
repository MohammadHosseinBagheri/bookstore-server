const userInfoTokenCheck = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const token = headers.split(" ")[1];
    if (token) {
      req.token = token;
      next();
    } else {
      return res.status(401).json({ message: "unauthorize" });
    }
  } catch (e) {
    res.status(500).json({ message: "internal error" });
  }
};
module.exports = userInfoTokenCheck;
