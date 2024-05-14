import React, { useState } from 'react'
import './App.css'
import { IQuestion } from './Types';
import SingleQuiz from './SingleQuiz';

const loadQuestions = async () => {
  const response = await fetch('./telecom3.json');
  const data = await response.json();
  return data;
}

interface Interval {
  start: number;
  end: number;
}

const groupStartIndexArr: Map<string, Interval> = new Map<string, Interval>( [
    ["тест 1", {start: 0, end: 474}],
    ["тест 2", {start: 475, end: 724}],
    // ["2.1", {start: 339, end: 360}],
    // ["2.2", {start: 361, end: 382}],
    // ["3.1", {start: 383, end: 393}],
    // ["3.2", {start: 394, end: 409}],
    // ["3.3", {start: 410, end: 417}],
    // ["4.2 АТС", {start: 427, end: 432}],
    // ["4.3 ISDN", {start: 433, end: 442}],
    // ["4.4 ADSL", {start: 443, end: 446}],
    // ["4.5 PDH-SDH", {start: 419, end: 426}],
    // ["4.6 Треб. к сетям", {start: 41, end: 46}],
    // ["4.7 OSI", {start: 47, end: 63}],
    // ["4.9 Топологии", {start: 93, end: 117}],
    // ["4.20 Мобильная", {start: 451, end: 459}],
    // ["4.20 X.25", {start: 796, end: 802}],
] );

const splitIQuestions = (questions: IQuestion[]): Map<string, IQuestion[]> => {
  const result: Map<string, IQuestion[]> = new Map<string, IQuestion[]>();
  for (const [key, value] of groupStartIndexArr) {
    result.set(key, questions.slice(value.start, value.end));
  }
  return result;
}

// it should show buttons to route to the quiz.
function App() {
  const [questions, setIQuestions] = useState<IQuestion[]>([]);
  const [splitIQuestionsMap, setSplitIQuestionsMap] = useState<Map<string, IQuestion[]>>(new Map<string, IQuestion[]>());
  const [selectedQuizName, setSelectedQuiz] = useState<string | null>(null);

  React.useEffect(() => {
      loadQuestions().then((data) => {
          // set field questions with data
          // loaded questions count:
          console.log(`Loaded questions count: ${data.length}`);
          setIQuestions(data.map((q: IQuestion) => replacePicUrl(q)));
          });
      }, []);

  React.useEffect(() => {
    setSplitIQuestionsMap(splitIQuestions(questions));
  }, [questions]);

  const selectQuiz = (index: string) => {
    setSelectedQuiz(index);
  }

  const replacePicUrl = (question: IQuestion) => {
    if (!question.questionPic) {
      return question;
    }
    question.questionPic = "https://ksgovnoznayte.netlify.app/" + question.questionPic;
    return question;
  }

  return (
    // show N buttons, where N is the number of quizzes. On click should call SingleQuiz component and hide others
    <>
    { selectedQuizName !== null && splitIQuestionsMap.size > 0 && <SingleQuiz name={selectedQuizName} questions={splitIQuestionsMap.get(selectedQuizName)!}/>}
    { selectedQuizName === null && [...splitIQuestionsMap.keys()].map((name) => (
      <button key={name} onClick={() => { selectQuiz(name); }}>
        {name}
      </button>
    ))}
   </>
  )
}

export default App
