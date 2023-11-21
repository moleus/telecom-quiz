import React  from 'react'
import './App.css'
import Quiz from 'react-quiz-component';
import { IQuestion, IQuiz } from './Types';

type Props = {
  name: string;
  questions: IQuestion[];
}

const createQuiz = (name: string, questions: IQuestion[]) => {
  const quiz: IQuiz = {
    quizTitle: "Telecom Quiz: " + name.toString(),
    quizSynopsis: "Telecom Quiz",
    nrOfQuestions: questions.length.toString(),
    questions: questions
  }
  return quiz;
}

const SingleQuiz: React.FC<Props> = ({ name: number, questions }) => {
  // toggle if you want to shuffle the questions
  const [shuffleQuestions, setShuffleQuestions] = React.useState<boolean>(false);
  const [shuffleAnswers, setShuffleAnswers] = React.useState<boolean>(false);

  return (
    <>
    <div>
      <label>
        <input type="checkbox" checked={shuffleQuestions} onChange={() => setShuffleQuestions(!shuffleQuestions)} />
        Shuffle questions
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" checked={shuffleAnswers} onChange={() => setShuffleAnswers(!shuffleAnswers)} />
        Shuffle answers
      </label>
    </div>
    <Quiz key={+shuffleAnswers + +shuffleQuestions} quiz={createQuiz(number, questions)} shuffle={shuffleQuestions} shuffleAnswer={shuffleAnswers} continueTillCorrect={true} showInstantFeedback={true} allowNavigation={true}/>
   </>
  )
}

export default SingleQuiz
