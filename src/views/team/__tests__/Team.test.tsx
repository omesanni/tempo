import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Team from '../Team';

jest.mock('axios', () => ({
  get: (url) => Promise.resolve({
    data: url.includes('teams') ? {} : [],
  }),
}));

const mockStore = configureMockStore([thunk]);

describe('Team', () => {
  let store;

  const initialState = {
    team: {
      fetchingTeam: false,
      record: {
        id: '1',
        name: 'team 1',
        teamLead: 'bb',
        members: [
          { userId: 'bb', teamId: '1' },
          { userId: 'll', teamId: '1' },
          { userId: 'cd', teamId: '1' },
          { userId: 'ee', teamId: '1' },
        ],
      },
    },
    user: {
      userNames: {
        bb: { name: 'sean williams' },
        ll: { name: 'karen huger' },
        cd: { name: 'kelly swanson' },
        ee: { name: 'jake bride' },
      },
    },
  };

  const props = { match: { params: { id: '1' } } };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders', () => {
    const { container } = render(
      <Provider store={store}>
        <Router><Team {...props} /></Router>
      </Provider>
    );

    const members = Array.from(container.querySelectorAll('.card'));
    members.forEach((team) => expect(team).toBeInTheDocument());
  });

  it('renders loader', () => {
    const newStore = mockStore({
      ...initialState,
      team: { ...initialState.team, fetchingTeam: true },
    });
    const { container } = render(
      <Provider store={newStore}>
        <Router><Team {...props} /></Router>
      </Provider>
    );

    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('filters team member list', () => {
    const { container } = render(
      <Provider store={store}>
        <Router><Team {...props} /></Router>
      </Provider>
    );
    
    const oldLength = container.querySelectorAll('.card').length;
    userEvent.type(container.querySelector('.form-control'), 'll');

    const newLength = container.querySelectorAll('.card').length;
    expect(newLength).toBeLessThan(oldLength);

    userEvent.type(container.querySelector('.form-control'), '{selectall}{del}');
    expect(container.querySelectorAll('.card').length).toBeGreaterThan(newLength);
  });

  it('renders no results after filtering team member list', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Router><Team {...props} /></Router>
      </Provider>
    );
    
    userEvent.type(container.querySelector('.form-control'), 'wwww');

    expect(container.querySelectorAll('.card').length).toBeFalsy();
    expect(getByText(/no results/i)).toBeInTheDocument();
  });
});
