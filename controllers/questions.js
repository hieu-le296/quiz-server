const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const db = require('../utils/db-query');
const { convert } = require('../utils/obj-conversion');

// @desc Get all the question
// @route GET /api/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const results = await db.showQuestion();
    const data = convert(results);
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res
      .status(201)
      .json({ success: false, message: 'Could not fetch questions' });
  }
};

// @desc Create a question
// @route POST /api/questions
exports.createQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: 'question successfully created' });
};

// @desc Update a question
// @route PUT /api/questions/:id
exports.updateQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: 'question successfully updated' });
};

// @desc Delete a question
// @route DELETE /api/questions/:id
exports.deleteQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: 'question successfully deleted' });
};
