import types from '../types'

export default (state = { searchInput: '', messageInput: '', convoHistory: []}, { type, payload }) => {
    switch(type) {
        case types.SEARCH_INPUT:
            return {
                ...state,
                ...payload
            }
        case types.MESSAGE_INPUT:
            return {
                ...state,
                ...payload
            }
        case types.GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                ...payload
            }
        case types.FINDING_QUESTION:
            return {
                ...state,
                ...payload
            }
        case types.GET_CHATBOT_SUCCESS:
            return {
                ...state,
                ...payload
            }
        case types.SEND_MESSAGE_TO_BOT_SUCCESS:
            return {
                ...state,
                ...payload
            }
        case types.HANDLE_ACTION: {
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state
    }
}