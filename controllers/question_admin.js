const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const db = require('../utils/db-query');
const { convert } = require('../utils/obj-conversion');

// @desc Get all the questions with answers to admin
// @route GET /api/admin/questions
exports.getAdminQuestions = async (req, res, next) => {
  try {
    const results = await db.showAdminQuestions();
    const data = convert(results, 'Admin');
    res.status(200).json({
      success: true,
      count: data.length,
      questions: data,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Could not fetch questions' });
  }
};

// @desc Get one question and its detail for editing
// @route GET /api/admin/questions
exports.getAdminOneQuestion = async (req, res, next) => {
  try {
    const results = await db.showAdminOneQuestion(req.params.id);
    const data = convert(results, 'Admin');
    res.status(200).json({
      success: true,
      count: data.length,
      question: data,
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
    const results = await db.createQuestion(req.body);
    if (results === undefined) {
      res.status(400).json({
        success: false,
        message: 'Could not create a question or question duplicate',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Question successfully created',
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not create a question' });
  }
};

// @desc Update a question
// @route PUT /api/admin/questions/:id
exports.updateQuestion = async (req, res, next) => {
  try {
    await db.updateQuestionStatus(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: 'Question successfully updated' });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not update a question' });
  }
};

// @desc Update the question status
// @route PUT /api/admin/questions/status/:id
exports.updateQuestionStatus = async (req, res, next) => {
  try {
    await db.updateQuestionStatus(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: 'Question status successfully updated' });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Could not update the question status',
    });
  }
};

// @desc Delete a question
// @route DELETE /api/admin/questions/:id
exports.deleteQuestion = async (req, res, next) => {
  try {
    await db.deleteQuestion(req.params.id);
    res
      .status(200)
      .json({ success: true, message: 'question successfully deleted' });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not delete a question' });
  }
};

// @desc Delete an option
// @route DELETE /api/admin/questions/options/:id
exports.deleteOption = async (req, res, next) => {
  try {
    await db.deleteOption(req.params.id);
    res
      .status(200)
      .json({ success: true, message: 'Option successfully deleted' });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not delete that option' });
  }
};
