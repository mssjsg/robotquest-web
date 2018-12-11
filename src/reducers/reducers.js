import { combineReducers } from 'redux'
import { UPDATE_SCORE } from '../actions/actions'

function game(state, action) {
    switch(action.type) {
        case UPDATE_SCORE:
            return {
                score: action.score,
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