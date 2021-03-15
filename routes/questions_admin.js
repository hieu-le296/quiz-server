const express = require('express');
const router = express.Router();
const { performValidation } = require('../utils/validation');

const {
  getAdminQuestions,
  getAdminOneQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questions');

router
  .route('/')
  .get(getAdminQuestions)
  .post(performValidation, createQuestion);

router
  .route('/:id')
  .get(getAdminOneQuestion)
  .put(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
