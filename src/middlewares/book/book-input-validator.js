const { body } = require("express-validator");

const bookFieldsValidation = () => {
  return [
    body("name").notEmpty().withMessage("name required"),
    body("description").notEmpty().withMessage("description required"),
    body("writer").notEmpty().withMessage("writer required"),
    // body("image")
    //   .notEmpty()
    //   .withMessage("image required")
    //   .isObject()
    //   .withMessage("file format not valid"),
  ];
};

module.exports = bookFieldsValidation;
