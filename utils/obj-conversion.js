const { Question, QuestionAdmin } = require('../models/question');

exports.convert = (queryResult, type) => {
  const questionArr = [];

  if (type === 'User') {
    queryResult.forEach((element) => {
      const optionIDs = element.optionIDs.split(',').map(Number);
      const options = element.options.split(',');
      const question = new Question(
        element.qid,
        element.title,
        optionIDs,
        options
      );
      questionArr.push(question);
    });
  } else if (type === 'Admin') {
    queryResult.forEach((element) => {
      const optionIDs = element.optionIDs.split(',').map(Number);
      const options = element.options.split(',');
      const question = new QuestionAdmin(
        element.qid,
        element.title,
        optionIDs,
        options,
        element.answerID,
        element.optionNumber
      );
      questionArr.push(question);
    });
  }

  return questionArr;
};
