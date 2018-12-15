export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SET_CHAR_NAME = 'SET_CHAR_NAME';
export const LOAD_STAGE = "LOAD_STAGE";
export const MOVE_PLAYER = "MOVE_PLAYER";
export const TIME_UPDATED = "TIME_UPDATED";
export const UPDATE_SCREEN_SIZE = "UPDATE_SCREEN_SIZE";

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

export function movePlayer(x, y) {
    return {
        type: MOVE_PLAYER,
        x, y };
}

export function timeUpdated(interval) {
    return {
        type: TIME_UPDATED,
        interval };
}

export function updateScreenSize(width, height) {
    return {
        type: UPDATE_SCREEN_SIZE,
        width, height };
}