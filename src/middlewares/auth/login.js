const { body } = require("express-validator");

const loginAuthMiddleware = (req, res, next) => {
  return [
    body("phone")
      .notEmpty()
      .withMessage("شماره تلفن را وارد نکرده اید!")
      .isLength(10)
      .withMessage("شماره تلفن 10 رقم است!"),
    body("password").isLength({ min: 6 }).withMessage("حداقل تعداد پسورد 6 کاراکتر است!"),
  ];
};

module.exports = loginAuthMiddleware;
