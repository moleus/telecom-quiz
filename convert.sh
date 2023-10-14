# jq '.questions | map({
#   "question": .question,
#   "questionType": "text",
#   "answerSelectionType": "multiple",
#   "answers": [.answers[].text],
#   "correctAnswer": [(.answers | map(select(.correct)) | keys[]) | . + 1],
#   "messageForCorrectAnswer": "Correct",
#   "messageForIncorrectAnswer": "Incorrect",
#   "point": "1"
# })' telecom.json

jq '{
  "quizTitle": .quizTitle,
  "quizSynopsis": .quizSynopsis,
  "nrOfQuestions": .nrOfQuestions,
  "questions": [
    .questions[] | {
      "question": .question,
      "questionType": .questionType,
      "answerSelectionType": .answerSelectionType,
      "answers": .answers,
      "correctAnswer": .correctAnswer | map(.+1),
      "messageForCorrectAnswer": .messageForCorrectAnswer,
      "messageForIncorrectAnswer": .messageForIncorrectAnswer,
      "explanation": .explanation,
      "point": .point
    }
  ]
}' telecom.json

