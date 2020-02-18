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
        <div className="FAQ">
            <h2 className="FAQ__header header">FAQ</h2>
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