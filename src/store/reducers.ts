/**
 * @overview Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux';
import teamReducer from '../views/team/reducer';
import teamsReducer from '../views/teams/reducer';
import userReducer from '../views/shared/user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer,
  teams: teamsReducer,
});

export default rootReducer;
