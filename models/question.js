class Question {
  constructor(title, isEnabled, options) {
    this.title = title;
    this.isEnabled = isEnabled;
    this.options = options;
  }
}

class QuestionAdmin extends Question {
  constructor(
    title,
    options,
    questionID,
    isEnabled,
    optionIDs,
    answerID,
    optionNumber
  ) {
    super(title, isEnabled, options);
    this.questionID = questionID;
    this.optionIDs = optionIDs;
    this.answerID = answerID;
    this.optionNumber = optionNumber;
  }
}

module.exports = { Question, QuestionAdmin };
