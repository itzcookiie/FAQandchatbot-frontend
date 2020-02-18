import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getQuestions } from './actions'
import { searchInput, searchQuestion } from './actions'

const SearchPanel = ({ searchInput, searchQuestion, qnsAndAnswers=[], getQuestions }) => {

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="search-panel">
            <h5>Help and support</h5>
            <div className="search-panel__container">
                <h2 className="search-panel__header">What would you like to know?</h2>
                <form className="search-panel__form">
                    <input className="search-panel__input" size="80" placeholder="e.g. where is my delivery" onInput={searchQuestion} type="text" name="search-input"/>
                </form>
            </div>
            <div className="FAQ-question-links">
                <div className="FAQ-categories-list">
                    <h3 className="FAQ-categories-list__header header">Categories</h3>
                    <ul>
                        {qnsAndAnswers.map((qnsAndAnswer, key) => (
                            <li key={key}>
                                <a href={`#${qnsAndAnswer.category}`}>{qnsAndAnswer.category}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="FAQ-popular-qns-list">
                    <h3 className="FAQ-popular-qns-list__header header">Popular questions</h3>
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
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(
    mapStateToProps,
    { searchInput, searchQuestion, getQuestions }
)(SearchPanel)