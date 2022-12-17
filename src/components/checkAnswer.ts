function checkAnswer(correctAnswer: string, givenAnswer: string): boolean {
  console.log(correctAnswer);
  console.log(givenAnswer);

  // If sibilant and given fricative
  if (
    correctAnswer.includes("sibilant") &&
    !correctAnswer.includes("affricate") &&
    (givenAnswer.includes("sibilant") || givenAnswer.includes("fricative"))
  ) {
    correctAnswer = correctAnswer.replace("sibilant", "");
    givenAnswer = givenAnswer.replace("sibilant", "");
    givenAnswer = givenAnswer.replace("fricative", "");
    console.log(correctAnswer, givenAnswer)
    return correctAnswer === givenAnswer ? true : false;
  }
  if (
    correctAnswer.includes("sibilant affricate") &&
    (givenAnswer.includes("sibilant affricate") ||
      givenAnswer.includes("affricate"))
  ) {
    correctAnswer = correctAnswer.replace("sibilant affricate", "");
    givenAnswer = givenAnswer.replace("sibilant", "");
    givenAnswer = givenAnswer.replace("affricate", "");
    return correctAnswer === givenAnswer ? true : false;
  }
  return correctAnswer === givenAnswer ? true : false;
}

export default checkAnswer;
