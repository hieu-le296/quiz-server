const { check, validationResult, body } = require('express-validator');

exports.performValidation = async (req, res, next) => {
  await check('title')
    .notEmpty()
    .withMessage(' Please input the question title')
    .run(req);

  await check('options.*')
    .notEmpty()
    .withMessage(' All options need to be filled')
    .run(req);

  const errors = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !errors.isEmpty();

  if (hasError) {
    res.status(404).json({ success: false, message: errors.array() });
  } else {
    next();
  }
};
