import { ITeamState } from '../views/team/types';
import { ITeamsState } from '../views/teams/types';
import { IUserState } from '../views/shared/user/types';

export interface IStoreState {
  user: IUserState;
  team: ITeamState;
  teams: ITeamsState;
}
