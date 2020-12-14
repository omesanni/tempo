import reducer from '../reducer';
import { TeamsActionTypes } from '../types';

describe('reducer', () => {
  it('should handle FETCH_TEAMS_START', () => {
    const action = { type: TeamsActionTypes.FETCH_TEAMS_START };
    const initialState = {
      records: [],
      errorFetchingTeams: false,
      fetchingTeams: false,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      records: [],
      errorFetchingTeams: false,
      fetchingTeams: true,
    });
  });

  it('should handle FETCH_TEAMS_SUCCESS', () => {
    const action = {
      type: TeamsActionTypes.FETCH_TEAMS_SUCCESS,
      data: { records: [{ id: '1', name: 'the wizards', teamLead: '2' }] },
    };
    const initialState = {
      records: [],
      errorFetchingTeams: false,
      fetchingTeams: true,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      records: action.data.records,
      errorFetchingTeams: false,
      fetchingTeams: false,
    });
  });

  it('should handle FETCH_TEAMS_ERROR', () => {
    const action = { type: TeamsActionTypes.FETCH_TEAMS_ERROR };
    const initialState = {
      records: [],
      errorFetchingTeams: false,
      fetchingTeams: true,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      records: [],
      errorFetchingTeams: true,
      fetchingTeams: false,
    });
  });
});