const express = require('express');
const router = express.Router();
const { performValidation } = require('../utils/validation');

const {
  getAdminQuestions,
  getAdminOneQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteOption,
} = require('../controllers/question_admin');

router
  .route('/')
  .get(getAdminQuestions)
  .post(performValidation, createQuestion);

router
  .route('/:id')
  .get(getAdminOneQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

router.route('/options/:id').delete(deleteOption);

module.exports = router;
