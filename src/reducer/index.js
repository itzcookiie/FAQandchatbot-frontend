import types from '../types'

export default (state = { searchInput: ''}, { type, payload }) => {
    switch(type) {
        case types.SEARCH_INPUT:
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
        default:
            return state
    }
}