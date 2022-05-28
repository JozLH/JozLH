import { queries } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
import MusicPlayerCard from './components/MusicPlayerCard';
import {fetchSongList} from './Api'
import { qsData } from './data/data';
const Total_Songs = qsData.length;

export type AnswerObject={
 question: string;
 answer: string;
 correct: boolean;
 correctAnswer: string;
}

const App=()=> {
    const [loading, setLoading] = useState(false);
    const [questions,setQuestions] = useState<any>([])
    const [songs, setSongs] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    
    const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newSongs = await fetchSongList()
      setQuestions(newSongs)
      setScore(0)
      setUserAnswer([])
      setNumber(0)
      setLoading(false)

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value
    if(!gameOver){
      const correct = questions[number].correct_answer === answer

      if(correct) setScore((prevSate)=>prevSate+1)
      const answerObject ={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      }
      setUserAnswer((prevSate)=>[...prevSate,answerObject])
    }

  }
  const nextQuestion = () => {

    const nextQ = number + 1;
    if(nextQ === Total_Songs){
      setGameOver(true)
    }else{
      setNumber(nextQ)
    }
  }


return (
<div className="App">
   <h1>Welcome to Spotiguess</h1>
   {
     gameOver || userAnswer.length === Total_Songs ?(
      <button className="" onClick={startTrivia}> Start</button>

     )
     : null
   }
   {
     !gameOver ?  <p className="score">Score:</p> : null
   }
  {loading ? <p className="">Loading songs…</p>: null }
  {
    !loading && !gameOver && (
   <MusicPlayerCard 
    questionNr={number + 1}
    totalSongs={Total_Songs}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswer ? userAnswer[number] : undefined}
    callback={checkAnswer}
/>

    )
  }
  {
    !gameOver && !loading && userAnswer.length === number +1 && number !== Total_Songs ? (
      <button className="next" onClick={nextQuestion}>Next song</button>

    )
    : null
  }
  </div> )
}

export default App;