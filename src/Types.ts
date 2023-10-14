
export interface IQuestion {
  question: string;
  questionType: "text" | "image"; // Assuming there are only two possible values
  questionPic?: string; // This property is optional for image questions
  answerSelectionType: "single" | "multiple"; // You might want to adjust this depending on your needs
  answers: string[];
  correctAnswer: string; // Assuming the correct answer is represented by its index in the 'answers' array
  messageForCorrectAnswer: string;
  messageForIncorrectAnswer: string;
  explanation: string;
  point: string;
}

export interface IQuiz {
  quizTitle: string;
  quizSynopsis: string;
  nrOfQuestions: string;
  questions: IQuestion[];
}
