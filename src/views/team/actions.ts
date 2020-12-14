import axios from 'axios';
import { Dispatch } from 'redux';
import { USERS_API, TEAMS_API } from '../shared/constants';
import { fetchUserName } from '../shared/user/actions';
import {
  ITeam,
  TeamActionTypes,
  IFetchTeamErrorAction,
  IFetchTeamStartAction,
  IResetTeamDataAction,
  IFetchTeamSuccessAction,
} from './types';

/**
 * Resets team data to initial state
 * @return {Object}
 */
export function resetTeamData(): IResetTeamDataAction {
  return {
    type: TeamActionTypes.RESET_TEAM_DATA,
  };
}

/**
 * Trigger action to start fetching team
 * @return {Object}
 */
export function fetchTeamStart(): IFetchTeamStartAction {
  return {
    type: TeamActionTypes.FETCH_TEAM_START,
  };
}

/**
 * Trigger action when team fetch successfully completed
 * @param  {Array}   record Team returned from api call
 * @return {Object}
 */
export function fetchTeamSuccess(record: ITeam): IFetchTeamSuccessAction {
  return {
    type: TeamActionTypes.FETCH_TEAM_SUCCESS,
    data: { record },
  };
}

/**
 * Trigger action when team fetch errors out
 * @return {Object}
 */
export function fetchTeamError(): IFetchTeamErrorAction {
  return {
    type: TeamActionTypes.FETCH_TEAM_ERROR,
  };
}


/**
 * Fetch team
 * @return {Promise}
 */
export function fetchTeam(teamId: string): any {
  return (dispatch: Dispatch) => {
    dispatch(fetchTeamStart());

    return Promise.all([
      axios.get(`${TEAMS_API}/${teamId}`),
      axios.get(USERS_API),
    ]).then(
      res => {
        const [team, users] = res;
        const members = users.data.filter((user) => user.teamId === team.data.id);
        
        Promise.all(members.map((member) => dispatch(fetchUserName(member.userId))));
        dispatch(fetchTeamSuccess({ ...team.data, members }));
        return res;
      },
      err => {
        dispatch(fetchTeamError());
        return Promise.reject(err);
      },
    );
  };
}
