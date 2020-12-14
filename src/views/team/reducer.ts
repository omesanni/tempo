/**
 * @overview Team reducer.
 */
import { handleActions } from 'redux-actions';
import { ITeamBaseAction, ITeamState } from './types';

export const initialState: ITeamState = {
  record: null,
  errorFetchingTeam: false,
  fetchingTeam: false,
};

export default handleActions(
  {
    RESET_TEAM_DATA: () => ({ ...initialState }),
    FETCH_TEAM_START: (state: ITeamState) => ({
      ...state,
      fetchingTeam: true,
      errorFetchingTeam: false,
    }),
    FETCH_TEAM_SUCCESS: (state: ITeamState, { data }: ITeamBaseAction) => ({
      ...state,
      fetchingTeam: false,
      record: data.record,
    }),
    FETCH_TEAM_ERROR: (state: ITeamState) => ({
      ...state,
      fetchingTeam: false,
      errorFetchingTeam: true,
    }),
  },
  initialState,
);
