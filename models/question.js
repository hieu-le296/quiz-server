class Question {
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
}

class QuestionAdmin extends Question {
  constructor(title, options, questionID, optionIDs, answerID, optionNumber) {
    super(title, options);
    this.questionID = questionID;
    this.optionIDs = optionIDs;
    this.answerID = answerID;
    this.optionNumber = optionNumber;
  }
}

module.exports = { Question, QuestionAdmin };
