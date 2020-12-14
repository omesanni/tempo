import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import NoResults from '../../components/NoResults';
import SearchFilter from '../../components/SearchFilter';
import * as teamsActions from './actions';
import { IUserNames } from '../shared/user/types';
import { ITeam } from './types';
import { IStoreState } from '../../store/types';

interface ITeamsProps {
  teams: ITeam[];
  isFetchingTeams: boolean;
  memberNames: IUserNames;
  actions: {
    fetchTeams: typeof teamsActions.fetchTeams,
  };
}

const Teams = ({ teams, actions, memberNames, isFetchingTeams }: ITeamsProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    actions.fetchTeams();
  }, []);

  /**
   * Handles search filter input change event
   * @param  {HTMLInputElement}  event input field change event
   */
  const handleSearchFilter = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const filteredTeams = useMemo<ITeam[]>(() => {
    const isEmpty = !value.trim().length;

    return isEmpty ? teams : teams.filter((team) =>
      team.name.toLowerCase().includes(value.trim().toLowerCase()));
  }, [value, teams]);

  return (
    <Layout title="Teams">
      <SearchFilter value={value} placeholder="filter teams" onChange={handleSearchFilter} />
      {!filteredTeams.length && !isFetchingTeams && <NoResults message="No teams found" />}
      <div className="row">
        {isFetchingTeams && <Loader />}
        {filteredTeams.map((team) => (
          <div key={team.id} className="col-sm-6 col-md-4 col-lg-3 mt-4">
            <div className="card">
              <Link to={`/teams/${team.id}`}>{team.name}</Link>
              {team.teamLead && (
                <small>
                  Team Lead: {memberNames?.[team.teamLead]?.name}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default connect(
  ({ teams, user }: IStoreState) => ({
    teams: teams.records,
    memberNames: user.userNames,
    isFetchingTeams: teams.fetchingTeams,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...teamsActions }, dispatch),
  }),
)(Teams);
