const express = require('express');
const router = express.Router();
const { performValidation } = require('../utils/validation');

const {
  getAdminQuestions,
  getAdminOneQuestion,
  createQuestion,
  updateQuestion,
  updateQuestionStatus,
  deleteQuestion,
  deleteAllQuestions,
  deleteOption,
} = require('../controllers/question_admin');

router
  .route('/')
  .get(getAdminQuestions)
  .post(performValidation, createQuestion)
  .delete(deleteAllQuestions);

router
  .route('/:id')
  .get(getAdminOneQuestion)
  .put(performValidation, updateQuestion)
  .delete(deleteQuestion);

router.route('/status/:id').put(updateQuestionStatus);

router.route('/options/:id').delete(deleteOption);

module.exports = router;
