// @desc Get all the question
// @route GET /api/questions
exports.getQuestions = (req, res, next) => {
  res.status(200).json({ sucess: true, message: 'Display all question' });
};

// @desc Create a question
// @route POST /api/questions
exports.createQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ sucess: true, message: 'question successfully created' });
};

// @desc Update a question
// @route PUT /api/questions/:id
exports.updateQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ sucess: true, message: 'question successfully updated' });
};

// @desc Delete a question
// @route DELETE /api/questions/:id
exports.deleteQuestion = (req, res, next) => {
  res
    .status(201)
    .json({ sucess: true, message: 'question successfully deleted' });
};
