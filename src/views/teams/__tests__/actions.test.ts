import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { TeamsActionTypes } from '../types';
import { UserActionTypes } from '../../shared/user/types';
import { fetchTeams } from '../actions';

describe('Teams actions', () => {
  const state = {
    team: {},
    user: {},
    teams: {},
  };
  
  const store = configureMockStore([thunk])(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('creates FETCH_TEAMS_SUCCESS when fetching teams is done', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [{ teamLead: '55' }] });
    const expectedActions = [
      { type: TeamsActionTypes.FETCH_TEAMS_START },
      { type: UserActionTypes.FETCH_USER_NAME_START, data: { id: '55' } },
      { type: TeamsActionTypes.FETCH_TEAMS_SUCCESS, data: { records: [{ teamLead: '55' }] } },
    ];

    await store.dispatch(fetchTeams());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_TEAMS_ERROR when fetching teams is fails', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error());
    const expectedActions = [
      { type: TeamsActionTypes.FETCH_TEAMS_START },
      { type: TeamsActionTypes.FETCH_TEAMS_ERROR },
    ];

    try {
      await store.dispatch(fetchTeams());
    } catch {
      expect(store.getActions()).toEqual(expectedActions);
    }
  });
});
