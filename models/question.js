class Question {
  constructor(questionID, title, optionIDs, options) {
    this.questionID = questionID;
    this.title = title;
    this.optionIDs = optionIDs;
    this.options = options;
  }
}

class QuestionAdmin extends Question {
  constructor(questionID, title, optionIDs, options, answerID, optionNumber) {
    super(questionID, title, optionIDs, options);
    this.answerID = answerID;
    this.optionNumber = optionNumber;
  }
}

module.exports = { Question, QuestionAdmin };
