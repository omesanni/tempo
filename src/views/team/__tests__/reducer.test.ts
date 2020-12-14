import reducer from '../reducer';
import { TeamActionTypes } from '../types';

describe('reducer', () => {
  it('should handle RESET_TEAM_DATA', () => {
    const action  = { type: TeamActionTypes.RESET_TEAM_DATA };
    const initialState = {
      record: { id: '1' },
      errorFetchingTeam: true,
      fetchingTeam: false,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      record: null,
      errorFetchingTeam: false,
      fetchingTeam: false,
    });
  });

  it('should handle FETCH_TEAM_START', () => {
    const action = { type: TeamActionTypes.FETCH_TEAM_START };
    const initialState = {
      records: null,
      errorFetchingTeam: true,
      fetchingTeam: false,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      records: null,
      errorFetchingTeam: false,
      fetchingTeam: true,
    });
  });

  it('should handle FETCH_TEAM_SUCCESS', () => {
    const action = {
      type: TeamActionTypes.FETCH_TEAM_SUCCESS,
      data: { record: { id: '1', members: [{ userId: '2', teamId: '1' }] } },
    };
    const initialState = {
      record: {},
      errorFetchingTeam: false,
      fetchingTeam: true,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      record: action.data.record,
      errorFetchingTeam: false,
      fetchingTeam: false,
    });
  });

  it('should handle FETCH_TEAM_ERROR', () => {
    const action = { type: TeamActionTypes.FETCH_TEAM_ERROR };
    const initialState = {
      record: null,
      errorFetchingTeam: false,
      fetchingTeam: true,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      record: null,
      errorFetchingTeam: true,
      fetchingTeam: false,
    });
  });
});
