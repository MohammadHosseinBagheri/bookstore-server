const { body } = require("express-validator");

const loginAuthMiddleware = (req, res, next) => {
  return [
    body("phone")
      .notEmpty()
      .withMessage("phone should not be empty ")
      .isLength(10)
      .withMessage("ohone number should be 10 charachters"),
    body("password").isLength({ min: 6 }).withMessage("password minimum is 6"),
  ];
};

module.exports = loginAuthMiddleware;
