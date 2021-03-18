const express = require('express');
const router = express.Router();

const { getQuestions, getAnswers } = require('../controllers/question_user');

router.route('/').get(getQuestions).post(getAnswers);

module.exports = router;
