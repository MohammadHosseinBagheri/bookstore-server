const { body } = require("express-validator");

const registerAuthMiddleware = (req, res, next) => {
  return [
    body("name").notEmpty().withMessage("name should not be empty "),
    body("lastName").notEmpty().withMessage("last name should not be empty "),
    body("phone")
      .notEmpty()
      .withMessage("phone should not be empty ")
      .isLength(10)
      .withMessage("ohone number should be 10 charachters"),
    body("password").isLength({ min: 6 }).withMessage("password minimum is 6"),
    body("email").isEmail().withMessage("invalid email address"),
  ];
};

module.exports = registerAuthMiddleware;
