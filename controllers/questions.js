const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const db = require('../utils/db-query');
const { convert } = require('../utils/obj-conversion');
const { checkScore } = require('../utils/check-score');

// @desc Get all the question to users
// @route GET /api/questions
exports.getQuestions = async (req, res, next) => {
  try {
    const results = await db.showQuestions();
    const data = convert(results, 'User');
    res.status(200).json({
      success: true,
      count: data.length,
      questions: data,
    });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: 'Could not fetch questions' });
  }
};

// @desc Receving answers from user
// @route POST /api/questions
exports.getAnswers = async (req, res, next) => {
  try {
    const studentAnswers = req.body.answers;
    const answersObj = await db.getAnswers();

    const score = checkScore(studentAnswers, answersObj[0].answers);

    res.status(200).json({
      success: true,
      correctAnswer: answersObj[0].answers,
      message: `Your score is ${score} / ${studentAnswers.length}`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: 'Could not upload answers' });
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
      questions: data,
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
  console.log(req.body);
  try {
    const results = await db.createQuestion(req.body);
    if (results === undefined) {
      res
        .status(400)
        .json({ success: false, message: 'Could not create a question' });
    } else {
      res.status(201).json({
        success: true,
        message: 'question successfully created',
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
    await db.updateQuestion(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: 'question successfully updated' });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Could not update a question' });
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
