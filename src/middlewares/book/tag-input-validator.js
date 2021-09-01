const { body } = require("express-validator");

const tagFieldsValidation = () => {
  return [
    body("name").notEmpty().withMessage("name required"),
    body("tagType")
      .matches(/iterest|category/)
      .withMessage("tag can one of interest or category"),
  ];
};

module.exports = tagFieldsValidation;
