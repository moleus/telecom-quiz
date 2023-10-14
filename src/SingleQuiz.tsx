import React  from 'react'
import './App.css'
import Quiz from 'react-quiz-component';
import { IQuestion, IQuiz } from './Types';

type Props = {
  number: number;
  questions: IQuestion[];
}

const createQuiz = (name: number, questions: IQuestion[]) => {
  const quiz: IQuiz = {
    quizTitle: "Telecom Quiz: " + name.toString(),
    quizSynopsis: "Telecom Quiz",
    nrOfQuestions: questions.length.toString(),
    questions: questions
  }
  return quiz;
}

const SingleQuiz: React.FC<Props> = ({ number, questions }) => {
  return (
    <>
      <Quiz quiz={createQuiz(number, questions)} shuffle={true} shuffleAnswer={true}/>
   </>
  )
}

export default SingleQuiz
