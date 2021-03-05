const { check, validationResult } = require('express-validator');

exports.performValidation = async (req, res, next) => {
  await check('title')
    .notEmpty()
    .withMessage('Please input the question title')
    .run(req);

  await check('options')
    .notEmpty()
    .withMessage('Please input an option for question')
    .run(req);

  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(404).json({ success: false, message: error.array() });
  } else {
    next();
  }
};
