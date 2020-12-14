import axios from 'axios';
import { Dispatch } from 'redux';
import { USERS_API } from '../constants';
import {
  IUser,
  UserActionTypes,
  IFetchUserNameErrorAction,
  IFetchUserNameStartAction,
  IFetchUserNameSuccessAction,
} from './types';

/**
 * Trigger action to start fetching team user's name
 * @return {Object}
 */
export function fetchUserNameStart(id: string): IFetchUserNameStartAction {
  return {
    type: UserActionTypes.FETCH_USER_NAME_START,
    data: { id },
  };
}

/**
 * Trigger action when user's name fetch is successfully completed
 * @param  {Array}   record Team returned from api call
 * @return {Object}
 */
export function fetchUserNameSuccess(record: IUser): IFetchUserNameSuccessAction {
  return {
    type: UserActionTypes.FETCH_USER_NAME_SUCCESS,
    data: { record },
  };
}

/**
 * Trigger action when user's name fetch errors out
 * @return {Object}
 */
export function fetchUserNameError(id: string): IFetchUserNameErrorAction {
  return {
    type: UserActionTypes.FETCH_USER_NAME_ERROR,
    data: { id },
  };
}

/**
 * Fetch user's name
 * @return {Promise}
 */
export function fetchUserName(userId: string): any {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserNameStart(userId));

    return axios.get(`${USERS_API}/${userId}`).then(
      res => {
        dispatch(fetchUserNameSuccess(res.data));
        return res.data;
      },
      err => {
        dispatch(fetchUserNameError(userId));
        return Promise.reject(err);
      },
    );
  };
}
