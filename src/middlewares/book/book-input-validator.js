const { body } = require("express-validator");

const bookFieldsValidation = () => {
  return [
    body("name").notEmpty().withMessage("نام کتاب اجباری است!"),
    body("description").notEmpty().withMessage("توضیحات کتاب اجباری است!"),
    body("writer").notEmpty().withMessage("نام نویسنده اجباری است!"),
    // body("image")
    //   .notEmpty()
    //   .withMessage("image required")
    //   .isObject()
    //   .withMessage("file format not valid"),
  ];
};

module.exports = bookFieldsValidation;
