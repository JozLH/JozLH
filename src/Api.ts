import { qsData } from "./data/data";
import { shuffleArray } from "./utils/utils";


export type Question ={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string;
}

export const fetchSongList = async ()=>{

    const data = qsData
    return data.map((question: Question) => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}