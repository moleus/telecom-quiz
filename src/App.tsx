import React, { useState } from 'react'
import './App.css'
import { IQuestion } from './Types';
import SingleQuiz from './SingleQuiz';

const loadQuestions = async () => {
  const response = await fetch('/telecom3.json');
  const data = await response.json();
  return data;
}

const splitIQuestions = (questions: IQuestion[], bulkSize: number): IQuestion[][] => {
  const result: IQuestion[][] = [];
  for (let i = 0; i < questions.length; i += bulkSize) {
    result.push(questions.slice(i, i + bulkSize));
  }
  return result;
}

// it should show buttons to route to the quiz.
function App() {
  const [questions, setIQuestions] = useState<IQuestion[]>([]);
  const [splitIQuestionsArray, setSplitIQuestionsArray] = useState<IQuestion[][]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  React.useEffect(() => {
      loadQuestions().then((data) => {
          // set field questions with data
          // loaded questions count:
          console.log(`Loaded questions count: ${data.length}`);
          setIQuestions(data);
          });
      }, []);

  React.useEffect(() => {
    setSplitIQuestionsArray(splitIQuestions(questions, 100));
  }, [questions]);

  const selectQuiz = (index: number) => {
    setSelectedQuiz(index);
  }

  return (
    // show N buttons, where N is the number of quizzes. On click should call SingleQuiz component and hide others
    <>
    {selectedQuiz !== null && <SingleQuiz number={selectedQuiz} questions={splitIQuestionsArray[selectedQuiz]}/>}
    {selectedQuiz === null && splitIQuestionsArray.map((_, index) => (
      <button key={index} onClick={() => { selectQuiz(index); }}>
        {index}
      </button>
    ))}
   </>
  )
}

export default App
