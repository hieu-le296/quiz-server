const express = require('express');
const router = express.Router();

const { getQuestions, getAnswers } = require('../controllers/questions');

router.route('/').get(getQuestions).post(getAnswers);

module.exports = router;
