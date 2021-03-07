exports.checkScore = (studentAnswers, answersObj) => {
  let score = 0;

  const correctAnswers = convertArray(answersObj);

  studentAnswers.forEach((val, index) => {
    if (val === correctAnswers[index]) {
      score++;
    }
  });
  return score;
};

function convertArray(answersObj) {
  answersObj = answersObj.split(',').map(Number);
  return Array.from(answersObj);
}
