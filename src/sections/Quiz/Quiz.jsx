import './index.scss'
import { useState } from 'react';
import { quiz } from "../../questions";

const Quiz = () => {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      })

    const onClickNext = () => {
        setActiveQuestion((prev) => prev + 1);

        setResult((prev) =>
          selectedAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
              }
            : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )
      }

    const { questions } = quiz
    const { question, choices, correctAnswer } = questions[activeQuestion]

    console.log(questions)

    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
            console.log('right')
        } else {
            setSelectedAnswer(false)
            console.log('wrong')
        }
    }

    console.log(activeQuestion)
    return (
        <section className='quiz'>
            <div className='quiz__container'>
            <h1 className='quiz__title'>Quiz</h1>
            <h2 className='quiz__question'>{ question }</h2>
            <ul className='quiz__variants'>
                {
                    choices.map((answer) => (
                        <li className='quiz__answer' onClick={() => onAnswerSelected(answer)}>{answer}</li>
                    ))
                }
            </ul>
            <button className='quiz__button' onClick={onClickNext} disabled={selectedAnswerIndex === null} >{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
        </section>
    )
}

export default Quiz