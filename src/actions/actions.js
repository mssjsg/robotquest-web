export const UPDATE_SCORE = 'UPDATE_SCORE'
export const SET_CHAR_NAME = 'SET_CHAR_NAME'

export function updateScore(score) {
    return {
        type: UPDATE_SCORE,
        score
    }
}

export function setCharName(name) {
    return {
        type: SET_CHAR_NAME,
        name
    }
}