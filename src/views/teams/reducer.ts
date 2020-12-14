/**
 * @overview Teams reducer.
 */
import { handleActions } from 'redux-actions';
import { ITeamsBaseAction, ITeamsState } from './types';
import { IStoreState } from '../../store/types';

export const initialState: ITeamsState = {
  records: [],
  errorFetchingTeams: false,
  fetchingTeams: false,
};

export default handleActions(
  {
    FETCH_TEAMS_START: (state: IStoreState) => ({
      ...state,
      fetchingTeams: true,
      errorFetchingTeams: false,
    }),
    FETCH_TEAMS_SUCCESS: (state: IStoreState, { data }: ITeamsBaseAction) => ({
      ...state,
      fetchingTeams: false,
      records: data.records,
    }),
    FETCH_TEAMS_ERROR: (state: IStoreState) => ({
      ...state,
      fetchingTeams: false,
      errorFetchingTeams: true,
    }),
  },
  initialState,
);
