import { combineReducers } from 'redux'
import { UPDATE_SCORE, SET_CHAR_NAME } from '../actions/actions'

function game(state, action) {
    switch(action.type) {
        case UPDATE_SCORE:
            return {
                score: action.score,
            }
        case SET_CHAR_NAME:
            return {
                charName: action.name,
            }
        default:
            return {
                score: 0,
            }
    }
}

const robotQuestApp = combineReducers({
    game
})

export default robotQuestApp