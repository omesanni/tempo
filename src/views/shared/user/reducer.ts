/**
 * @overview User reducer.
 */
import { handleActions } from 'redux-actions';
import { IUserBaseAction, IUserState } from './types';

export const initialState: IUserState = {
  userNames: null,
};

export default handleActions(
  {
    FETCH_USER_NAME_START: (state: IUserState, { data: { id } }: IUserBaseAction) => ({
      ...state,
      userNames: {
        ...state.userNames,
        [id]: { ...state.userNames?.[id], fetching: true, error: false }, 
      },
    }),
    FETCH_USER_NAME_SUCCESS: (state: IUserState, { data: { record } }: IUserBaseAction) => ({
      ...state,
      userNames: {
        ...state.userNames,
        [record.id]: {
          ...state.userNames[record.id],
          error: false ,
          fetching: false,
          name: `${record.name.first} ${record.name.last}`,
        }, 
      },
    }),
    FETCH_USER_NAME_ERROR: (state: IUserState, { data: { id } }: IUserBaseAction) => ({
      ...state,
      userNames: {
        ...state.userNames,
        [id]: { ...state.userNames[id], fetching: false, error: true  }, 
      },
    }),
  },
  initialState,
);
