module.exports = class Question {
  constructor(questionID, title, optionIDs, options) {
    this.questionID = questionID;
    this.title = title;
    this.optionIDs = optionIDs;
    this.options = options;
  }
};
