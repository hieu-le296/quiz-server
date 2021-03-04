const { Question, QuestionAdmin } = require('../models/question');

exports.convert = (queryResult, type) => {
  // Convert the the query result to JSON object
  const obj = JSON.parse(JSON.stringify(queryResult));

  const questionArr = [];

  if (type === 'User') {
    obj.forEach((element) => {
      const optionIDs = element.optionIDs.split(',').map(Number);
      const options = element.options.split(',');
      const question = new Question(
        element.qid,
        element.question,
        optionIDs,
        options
      );
      questionArr.push(question);
    });
  } else if (type === 'Admin') {
    obj.forEach((element) => {
      const optionIDs = element.optionIDs.split(',').map(Number);
      const options = element.options.split(',');
      const question = new QuestionAdmin(
        element.qid,
        element.question,
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
