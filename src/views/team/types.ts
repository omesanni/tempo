export enum TeamActionTypes {
  FETCH_TEAM_START = 'FETCH_TEAM_START',
  FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS',
  FETCH_TEAM_ERROR = 'FETCH_TEAM_ERROR',
  RESET_TEAM_DATA = 'RESET_TEAM_DATA',
}

export interface IMember {
  userId: string;
  teamId: string;
}

export interface ITeam {
  id: string;
  name: string;
  teamLead: string;
  members: IMember[];
}

export interface ITeamBaseAction {
  type: TeamActionTypes;
  data?: { [key: string]: any },
}

export interface IFetchTeamStartAction extends ITeamBaseAction {
  type: TeamActionTypes.FETCH_TEAM_START;
}

export interface IFetchTeamSuccessAction extends ITeamBaseAction {
  type: TeamActionTypes.FETCH_TEAM_SUCCESS;
  data: { record: ITeam };
}

export interface IFetchTeamErrorAction extends ITeamBaseAction {
  type: TeamActionTypes.FETCH_TEAM_ERROR;
}

export interface IResetTeamDataAction extends ITeamBaseAction {
  type: TeamActionTypes.RESET_TEAM_DATA;
}

export interface ITeamState {
  readonly record: ITeam;
  readonly fetchingTeam: boolean;
  readonly errorFetchingTeam: boolean;
}
