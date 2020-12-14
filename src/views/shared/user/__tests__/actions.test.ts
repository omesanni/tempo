import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { UserActionTypes } from '../types';
import { fetchUserName } from '../actions';

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

  it('creates FETCH_USER_NAME_SUCCESS when fetching user name is done', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { name: { first: 'glen', last: 'michaels' } } ,
    });
    const expectedActions = [
      { type: UserActionTypes.FETCH_USER_NAME_START, data: { id: '1' } },
      { 
        type: UserActionTypes.FETCH_USER_NAME_SUCCESS,
        data: { record: { name: { first: 'glen', last: 'michaels' } } },
      },
    ];

    await store.dispatch(fetchUserName('1'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates FETCH_USER_NAME_ERROR when fetching user name fails', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
    const expectedActions = [
      { type: UserActionTypes.FETCH_USER_NAME_START, data: { id: '2' } },
      { type: UserActionTypes.FETCH_USER_NAME_ERROR, data: { id: '2' } },
    ];

    try {
      await store.dispatch(fetchUserName('2'));
    } catch {
      expect(store.getActions()).toEqual(expectedActions);
    }
  });
});
