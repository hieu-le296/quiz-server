const express = require('express');
const router = express.Router();

const {
  getAdminQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

router.route('/').get(getAdminQuestions).post(createQuestion);

router.route('/:id').put(updateQuestion).delete(deleteQuestion);

module.exports = router;
