import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch, AnyAction } from 'redux';
import { TEAMS_API } from '../shared/constants';
import { fetchUserName } from '../shared/user/actions';
import {
  ITeam,
  TeamsActionTypes,
  IFetchTeamsErrorAction,
  IFetchTeamsStartAction,
  IFetchTeamsSuccessAction,
} from './types';

/**
 * Trigger action to start fetching teams
 * @return {Object}
 */
export function fetchTeamsStart(): IFetchTeamsStartAction {
  return {
    type: TeamsActionTypes.FETCH_TEAMS_START,
  };
}

/**
 * Trigger action when teams fetch successfully completed
 * @param  {Array}  records Teams returned from api call
 * @return {Object}
 */
export function fetchTeamsSuccess(records: ITeam[]): IFetchTeamsSuccessAction {
  return {
    type: TeamsActionTypes.FETCH_TEAMS_SUCCESS,
    data: { records },
  };
}

/**
 * Trigger action when teams fetch errors out
 * @return {Object}
 */
export function fetchTeamsError(): IFetchTeamsErrorAction {
  return {
    type: TeamsActionTypes.FETCH_TEAMS_ERROR,
  };
}

/**
 * Fetch all teams
 * @return {Function}
 */
export function fetchTeams(): ThunkAction<Promise<ITeam[]>, void, void, AnyAction> {
  return (dispatch: Dispatch) => {
    dispatch(fetchTeamsStart());

    return axios.get(TEAMS_API).then(
      res => {
        Promise.all(res.data.map((d) => d.teamLead && dispatch(fetchUserName(d.teamLead))));
        dispatch(fetchTeamsSuccess(res.data));

        return res.data;
      },
      err => {
        dispatch(fetchTeamsError());
        return Promise.reject(err);
      },
    );
  };
}
