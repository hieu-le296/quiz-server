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
