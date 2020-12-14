export enum TeamsActionTypes {
  FETCH_TEAMS_START = 'FETCH_TEAMS_START',
  FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS',
  FETCH_TEAMS_ERROR = 'FETCH_TEAMS_ERROR',
}

export interface ITeam {
  id: string;
  name: string;
  teamLead: string;
}

export interface ITeamsBaseAction {
  type: TeamsActionTypes;
  data?: { [key: string]: any },
}

export interface IFetchTeamsStartAction extends ITeamsBaseAction {
  type: TeamsActionTypes.FETCH_TEAMS_START;
}

export interface IFetchTeamsSuccessAction extends ITeamsBaseAction {
  type: TeamsActionTypes.FETCH_TEAMS_SUCCESS;
  data: { records: ITeam[] };
}

export interface IFetchTeamsErrorAction extends ITeamsBaseAction {
  type: TeamsActionTypes.FETCH_TEAMS_ERROR;
}

export interface ITeamsState {
  readonly records: ITeam[];
  readonly fetchingTeams: boolean;
  readonly errorFetchingTeams: boolean;
}
