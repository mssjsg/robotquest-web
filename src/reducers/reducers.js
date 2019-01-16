import { combineReducers } from 'redux';
import { UPDATE_SCORE, SET_CHAR_NAME } from '../actions/gameActions';
import { game } from './gameReducer';

const robotQuestApp = combineReducers({
  game,
});

export default robotQuestApp;
