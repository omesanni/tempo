export enum UserActionTypes {
  FETCH_USER_NAME_START = 'FETCH_USER_NAME_START',
  FETCH_USER_NAME_SUCCESS = 'FETCH_USER_NAME_SUCCESS',
  FETCH_USER_NAME_ERROR = 'FETCH_USER_NAME_ERROR',
}

export interface IUser {
  id: string;
  team: string;
  name: { first: string, last: string };
}

export interface IUserNames {
  id: { name: string, error: boolean, fetching: boolean };
}

export interface IUserBaseAction {
  type: UserActionTypes;
  data?: { [key: string]: any },
}

export interface IFetchUserNameStartAction extends IUserBaseAction {
  type: UserActionTypes.FETCH_USER_NAME_START;
  data: { id: string };
}

export interface IFetchUserNameSuccessAction extends IUserBaseAction {
  type: UserActionTypes.FETCH_USER_NAME_SUCCESS;
  data: { record: IUser };
}

export interface IFetchUserNameErrorAction extends IUserBaseAction {
  type: UserActionTypes.FETCH_USER_NAME_ERROR;
  data: { id: string };
}

export interface IUserState {
  readonly userNames: IUserNames;
}
