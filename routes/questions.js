const express = require('express');
const router = express.Router();

const {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

router.route('/').get(getQuestions).post(createQuestion);

router.route('/:id').put(updateQuestion).delete(deleteQuestion);

module.exports = router;
