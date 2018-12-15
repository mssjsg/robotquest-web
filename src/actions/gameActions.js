export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SET_CHAR_NAME = 'SET_CHAR_NAME';
export const LOAD_STAGE = "LOAD_STAGE";

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

export function loadStage(index) {
    return { type: LOAD_STAGE, index };
}