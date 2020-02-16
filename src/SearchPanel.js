import React from 'react'
import { connect } from 'react-redux'
import { searchInput, searchQuestion } from './actions'

const SearchPanel = ({ searchInput, searchQuestion }) => {

    return (
        <div className="search-panel">
            <h2>What would you like to know?</h2>
            <form className="search-panel__form">
                <input className="search-panel__input" size="80" placeholder="E.g. where is my delivery" onInput={searchQuestion} type="text" name="search-input"/>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default connect(
    mapStateToProps,
    { searchInput, searchQuestion }
)(SearchPanel)