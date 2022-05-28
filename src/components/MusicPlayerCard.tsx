import React from 'react'
import {Wrapper,ButtonWrapper} from './MusicCardStyles'
type Props={
    question:string,
    answers?:string[],
    callback?:(e:React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: any,
    questionNr:number,
    totalSongs?:number
}










 const MusicPlayerCard:React.FC<Props>=(props:Props )=>{
console.log(props.answers)

  return (
    <div>
      <p className="number">
        Question {props.questionNr} / {props.totalSongs}
      </p>
        <p dangerouslySetInnerHTML={{__html: props.question}}></p>
        {props.answers?.map(answer => (
         <ButtonWrapper
         key={answer}
         correct={props.userAnswer?.correctAnswer === answer}
         userClicked={props.userAnswer?.answer === answer}
       >
          <button disabled={props.userAnswer} onClick={props.callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}/>
            </button>
            </ButtonWrapper>
        ) )}
     </div>
    
  );
}



export default MusicPlayerCard

