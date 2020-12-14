import reducer from '../reducer';
import { UserActionTypes } from '../types';

describe('reducer', () => {
  it('should handle FETCH_USER_NAME_START', () => {
    const action = { type: UserActionTypes.FETCH_USER_NAME_START, data: { id: 'as' } };
    const newState = reducer({ userNames: { as: {} } }, action);

    expect(newState).toEqual({
      userNames: { as: { error: false, fetching: true } },
    });
  });

  it('should handle FETCH_USER_NAME_SUCCESS', () => {
    const action = {
      type: UserActionTypes.FETCH_USER_NAME_SUCCESS,
      data: { record: { id: 'cd', name: { first: 'yao', last: 'ming' } } }, 
    };

    const initialState = { userNames: { cd: { error: false, fetching: true } } };
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      userNames: { cd: { name: 'yao ming', error: false, fetching: false } },
    });
  });

  it('should handle FETCH_USER_NAME_ERROR', () => {
    const action = { type: UserActionTypes.FETCH_USER_NAME_ERROR,  data: { id: 'de' } };
    const initialState = { userNames: { de: { error: false, fetching: true } } };
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      userNames: { de: { error: true, fetching: false } },
    });
  });
});
