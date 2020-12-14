import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../../components/Loader';
import Layout from '../../components/Layout';
import SearchFilter from '../../components/SearchFilter';
import NoResults from '../../components/NoResults';
import * as teamActions from './actions';
import { IMember, ITeam } from './types';
import { IUserNames } from '../shared/user/types';
import { IStoreState } from '../../store/types';

interface ITeamProps {
  team: ITeam;
  match: { params: { id: string } };
  isFetchingTeam: boolean;
  memberNames: IUserNames;
  actions: {
    fetchTeam: typeof teamActions.fetchTeam,
    resetTeamData: typeof teamActions.resetTeamData,
  };
}

const Team = ({ team, match, actions, isFetchingTeam, memberNames }: ITeamProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    actions.fetchTeam(match.params.id);
    return () => actions.resetTeamData();
  }, []);

  /**
   * Handles search filter input change event
   * @param  {HTMLInputElement}  event input field change event
   */
  const handleSearchFilter = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const teamMembers = useMemo<IMember[]>(() => {
    const isEmpty = !value.trim().length;
    const members = team?.members || [];

    return isEmpty ? members : members.filter((member) =>
      memberNames[member.userId].name.toLowerCase().includes(value.trim().toLowerCase()));
  }, [value, team]);

  const title = `Team${team?.name ? ` - ${team.name}` : ''}`;

  return (
    <Layout title={title} showBackIcon>
      <SearchFilter value={value} placeholder="filter team members" onChange={handleSearchFilter} />
      {!isFetchingTeam && !teamMembers.length && <NoResults message="No members found" />}
      <div className="row">
        {isFetchingTeam && <Loader />}
        {teamMembers.map((member) => (
          <div key={member.userId} className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card">
              <small>
                {member.userId === team.teamLead ? (
                  <span className="font-weight-bold">Team Lead: </span>
                ) : ''}
                {memberNames?.[member.userId]?.name}
              </small>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default connect(
  ({ team, user }: IStoreState) => ({
    team: team.record,
    memberNames: user.userNames,
    isFetchingTeam: team.fetchingTeam,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...teamActions }, dispatch),
  }),
)(Team);
