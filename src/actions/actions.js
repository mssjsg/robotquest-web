export const UPDATE_SCORE = 'UPDATE_SCORE'

export function updateScore(score) {
    return {
        type: UPDATE_SCORE,
        score
    }
}