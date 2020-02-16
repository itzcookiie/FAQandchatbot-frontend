import types from '../types'

export const searchInput = event => {
    const searchInput = event.target.value
    return {
        type: types.SEARCH_INPUT,
        payload: {
            searchInput
        }
    }
}

export const searchQuestion = event => (dispatch, getState) => {
    const { qnsAndAnswers } = getState();
    const searchInput = event.target.value
    dispatch({
        type: types.SEARCH_INPUT,
        payload: {
            searchInput
        }
    })
    const keywords = searchInput.split(' ').filter(letter => letter !== '' && letter.length > 2);
    const relatedCategories = qnsAndAnswers.filter(qandA => {
        const matchingKeywords = keywords.filter(keyword => {
            const uniformKeyword = keyword.toLowerCase()
            const category = qandA.category.toLowerCase() === uniformKeyword;
            const answers = qandA.questionsAndAnswers.filter(qa => {
                return qa.question.includes(uniformKeyword)
            })
            return category || answers.length > 0 
        })
        return matchingKeywords.length > 0
    })
    console.log(relatedCategories)
    // const relatedQuestions = relatedCategories.filter(question => question)
    // console.log(relatedQuestions)
    return dispatch({ 
        type: types.FINDING_QUESTION,
        payload: {
            relatedCategories
        }
    })
}

export const getQuestions = () => (dispatch) => {
    dispatch({ type: types.GET_QUESTIONS })
    return fetch('http://localhost:8000/')
    .then(r => r.json())
    .then(qnsAndAnswers => {
        dispatch({ type: types.GETTING_QUESTIONS })
        dispatch({ 
            type: types.GET_QUESTIONS_SUCCESS,
            payload: {
                qnsAndAnswers
            }
         })
    })
    .catch(error => {
        dispatch({ 
            type: types.GET_QUESTIONS_FAILED,
            error 
        })
    })
}