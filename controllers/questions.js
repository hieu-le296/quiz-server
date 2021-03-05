const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const db = require('../utils/db-query');
const { convert } = require('../utils/obj-conversion');

// @desc Get all the question to users
// @route GET /api/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const results = await db.showQuestions();
    const data = convert(results, 'User');
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: 'Could not fetch questions' });
  }
};

// @desc Get all the questions with answers to admin
// @route GET /api/admin/questions
exports.getAdminQuestions = async (req, res, next) => {
  try {
    const results = await db.showAdminQuestions();
    const data = convert(results, 'Admin');
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Could not fetch questions' });
  }
};

// @desc Create a question
// @route POST /api/admin/questions
exports.createQuestion = async (req, res, next) => {
  try {
    // Todo
    res.status(201).json({
      success: true,
      message: 'question successfully created',
      data: results,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not create a question' });
  }
};

// @desc Update a question
// @route PUT /api/admin/questions/:id
exports.updateQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: 'question successfully updated' });
};

// @desc Delete a question
// @route DELETE /api/admin/questions/:id
exports.deleteQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, message: 'question successfully deleted' });
};
