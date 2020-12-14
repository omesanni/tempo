import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TeamActionTypes } from '../types';
import { UserActionTypes } from '../../shared/user/types';
import { fetchTeam, resetTeamData } from '../actions';

jest.mock('axios', () => ({
  get: (url) => {
    let data;

    if (url.includes('teams/1')) {
      data = { id: '1' };
    } else if (url.includes('users/2')) {
      data = { name: { first: 'kenny', last: 'smith' } };
    } else {
      data = [{ userId: '2', teamId: '1' }];
    }
    
    return url.includes('teams/2') ? Promise.reject() : Promise.resolve({ data });
  },
}));

describe('Team actions', () => {
  const state = {
    team: {},
    user: {},
    teams: {},
  };
  
  const store = configureMockStore([thunk])(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('creates RESET_TEAM_RECORD to reset team record property', () => {
    const expectedActions = [{ type: TeamActionTypes.RESET_TEAM_DATA }];

    store.dispatch(resetTeamData()); 
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_TEAM_SUCCESS when fetching team is done', async () => {
    const expectedActions = [
      { type: TeamActionTypes.FETCH_TEAM_START },
      { type: UserActionTypes.FETCH_USER_NAME_START, data: { id: '2' } },
      { 
        type: TeamActionTypes.FETCH_TEAM_SUCCESS,
        data: { record: { id: '1', members: [{ userId: '2', teamId: '1' }] } },
      },
      { 
        type: UserActionTypes.FETCH_USER_NAME_SUCCESS,
        data: { record: { name: { first: 'kenny', last: 'smith' } } },
      },
    ];

    await store.dispatch(fetchTeam('1'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_TEAM_ERROR when fetching team fails', async () => {
    const expectedActions = [
      { type: TeamActionTypes.FETCH_TEAM_START },
      { type: TeamActionTypes.FETCH_TEAM_ERROR },
    ];

    try {
      await store.dispatch(fetchTeam('2'));
    } catch {
      expect(store.getActions()).toEqual(expectedActions);
    }
  });
});
