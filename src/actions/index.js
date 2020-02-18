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

export const messageInput = event => {
    const messageInput = event.target.value
    return {
        type: types.MESSAGE_INPUT,
        payload: {
            messageInput
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

    return dispatch({ 
        type: types.FINDING_QUESTION,
        payload: {
            relatedCategories
        }
    })
}

function sendMessageToBot(message, dispatch, convoHistory, botMessage=[], extra=[]) {
    dispatch({ type: types.SEND_MESSAGE_TO_BOT })
    dispatch({ type: message })
    console.log(convoHistory)
    return fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message})
    })
    .then(r => r.json())
    .then(response => {
        dispatch({ type: types.SENDING_MESSAGE_TO_BOT })
        dispatch({
            type: types.SEND_MESSAGE_TO_BOT_SUCCESS,
            payload: {
                convoHistory: [
                    ...convoHistory,
                    {
                        message: response.message,
                        options: [...botMessage, ...extra],
                        person: 'bot'
                    }
                ]
            }
        })
    })
    .catch(error => dispatch({ 
        type: types.SEND_MESSAGE_TO_BOT_FAILURE,
        error
     }))
}

export const getQuestions = () => (dispatch) => {
    dispatch({ type: types.GET_QUESTIONS })
    return fetch('http://localhost:8000/questions')
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

export const getChatbot = () => (dispatch, getState) => {
    dispatch({ type: types.GET_CHATBOT })
    const { convoHistory, qnsAndAnswers } = getState();
    const categories = qnsAndAnswers.map(qandA => qandA.category)
    return fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: 'intro'})
    })
    .then(r => r.json())
    .then(response => {
        dispatch({ type: types.GETTING_CHATBOT })
        dispatch({
            type: types.GET_CHATBOT_SUCCESS,
            payload: {
                convoHistory: [
                    ...convoHistory,
                    {
                        message: response.message,
                        options: [...categories, 'Other'],
                        person: 'bot'
                    }
                ]
            }
        })
    })
    .catch(error => dispatch({ 
        type: types.GET_CHATBOT_FAILED,
        error
     }))
}

const handleAction = (convoHistory, dispatch, value) => {
    return dispatch({ 
        type: types.HANDLE_ACTION,
        payload: {
            convoHistory: [
                ...convoHistory,
                {
                    message: [value],
                    options: [],
                    person: 'user'
                }
            ]
        }
    })
}

export const captureAction = event => (dispatch, getState) => {
    event.preventDefault();
    const { innerHTML:value } = event.target 
    const { convoHistory, qnsAndAnswers, } = getState();
    const categoryItem = qnsAndAnswers.filter(qandA => qandA.category === value)
    if(categoryItem.length > 0) {
        const botMessage = categoryItem.flatMap(category => 
            category.questionsAndAnswers.reduce((acc,curVal) => 
                acc.length > 0
                ? ([
                    ...acc,
                    curVal.question
                ])
                : ([
                    curVal.question
                ])
            ,[])
        )
        handleAction(convoHistory, dispatch, value)
        const {convoHistory:newConvoHistory} = getState()
        return sendMessageToBot('findQuestions', dispatch, newConvoHistory, botMessage, ['Other'])
    }
    if(typeof value === 'string') {
        const questionData = qnsAndAnswers.filter(category => 
            category.questionsAndAnswers.filter(qandA => qandA.question === value).length > 0
            )
        if(questionData.length > 0) {
            handleAction(convoHistory, dispatch, value)
            const categoryWithAnswer = qnsAndAnswers.filter(categoryItem => 
                categoryItem.questionsAndAnswers.filter(qandA => qandA.question === value).length > 0
                )
            const questionAnswerSet = categoryWithAnswer.map(categoryItem => 
                categoryItem.questionsAndAnswers.find(qandA => qandA.question === value)
                )
            const botMessage = questionAnswerSet.map(qandA => qandA.answer)
            const {convoHistory:newConvoHistory} = getState()
            sendMessageToBot('findAnswer', dispatch, newConvoHistory, botMessage)
            .then(_ => {
                const botMessage = ['Yes', 'No']
                const {convoHistory:updatedConvoHistory} = getState()
                sendMessageToBot('askMore', dispatch, updatedConvoHistory, botMessage)
            })
        }
        switch(value) {
            case 'Yes': {
                handleAction(convoHistory, dispatch, value)
                const {convoHistory:newConvoHistory} = getState()
                const botMessage = qnsAndAnswers.map(qandA => qandA.category)
                return sendMessageToBot('help', dispatch, newConvoHistory, botMessage)
            }
            case 'No': {
                handleAction(convoHistory, dispatch, value)
                const {convoHistory:newConvoHistory} = getState()
                return sendMessageToBot('finish', dispatch, newConvoHistory)
            }
            default: {
                const botMessage = ['999']
                const {convoHistory:newConvoHistory} = getState()
                sendMessageToBot('other', dispatch, newConvoHistory, botMessage)
            }
        }
    }
}