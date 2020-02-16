import React, { useState, useEffect } from 'react'
import QuestionAnswerCards from './QuestionAnswerCards'

const FAQ = () => {

    const [qnsAndAnswers, setQnsAndAnswers] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/')
        .then(r => r.json())
        .then(setQnsAndAnswers)
    }, [])

    return (
        <div>
            <h2>FAQ</h2>
            <div className="question-links">
                <div className="categories-list">
                    <h3>Categories</h3>
                </div>
                <div className="popular-qns-list">
                    <h3>Popular questions</h3>
                </div>
            </div>
            <div className="question-and-answers">
                {qnsAndAnswers.length > 0 &&
                    <QuestionAnswerCards q={qnsAndAnswers} />
                }
            </div>
        </div>
    )
}

export default FAQ