import React, { useState, useEffect } from 'react'

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
                    <div>
                        {qnsAndAnswers.map((qnsAndAnswer, key) => (
                            <div key={key}>
                                <h2>{qnsAndAnswer.category}</h2>
                                <ul>
                                    {qnsAndAnswer.questionsAndAnswers.map((qandA, key2) => (
                                        <li key={key2}>
                                            <h4>{qandA.question}</h4>
                                            <p>{qandA.answer}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default FAQ