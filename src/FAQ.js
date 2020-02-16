import React, { useEffect } from 'react'
import QuestionAnswerCards from './QuestionAnswerCards'
import { connect } from 'react-redux'
import { getQuestions } from './actions'
import FilteredQuestionAndAnswerCards from './FilteredQuestionAndAnswerCards'

const FAQ = ({ getQuestions, qnsAndAnswers=[], relatedCategories=[] }) => {

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div>
            <h2>FAQ</h2>
            <div className="FAQ-question-links">
                <div className="FAQ-question-links__categories-list">
                    <h3>Categories</h3>
                    <ul>
                        {qnsAndAnswers.map((qnsAndAnswer, key) => (
                            <li key={key}>
                                <a href={`#${qnsAndAnswer.category}`}>{qnsAndAnswer.category}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="FAQ-question-links__divider"></span>
                <div className="FAQ-question-links__popular-qns-list">
                    <h3>Popular questions</h3>
                    <ol>
                    {qnsAndAnswers.slice(2,4).map(qnsAndAnswer => 
                        qnsAndAnswer.questionsAndAnswers.map((qandA, key) => (
                            <li key={key}>
                                <a href={`#${qandA.question.split(' ').join('-')}`}>{qandA.question}</a>
                            </li>
                        ))
                    )}
                    </ol>
                </div>
            </div>
            <div className="FAQ-question-and-answers">
                {qnsAndAnswers.length > 0 &&
                    relatedCategories.length > 0 ? <FilteredQuestionAndAnswerCards data={relatedCategories}/> : <QuestionAnswerCards data={qnsAndAnswers} />
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(
    mapStateToProps,
    { getQuestions }
)(FAQ)