const Question = require('../models/question');

exports.convert = (queryResult) => {
  // Convert the the query result to JSON object
  const obj = JSON.parse(JSON.stringify(queryResult));

  const questionArr = [];
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
  return questionArr;
};
