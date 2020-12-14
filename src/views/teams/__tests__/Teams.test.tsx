import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Teams from '../Teams';

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: [] }),
}));

const mockStore = configureMockStore([thunk]);

describe('Teams', () => {
  let store;

  const initialState = {
    teams: {
      fetchingTeams: false,
      records: [
        { id: '1', name: 'team 1', teamLead: 'cc' },
        { id: '2', name: 'team 2', teamLead: 'dd' },
      ],
    },
    user: {
      userNames: {
        cc: { name: 'tim booker' },
        dd: { name: 'roger ryder' },
      },
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders', () => {
    const { container } = render(
      <Provider store={store}>
        <Router><Teams /></Router>
      </Provider>
    );

    const teams = Array.from(container.querySelectorAll('.card'));
    teams.forEach((team) => expect(team).toBeInTheDocument());
  });

  it('renders loader', () => {
    const newStore = mockStore({
      ...initialState,
      teams: { ...initialState.teams, fetchingTeams: true },
    });
    const { container } = render(
      <Provider store={newStore}>
        <Router><Teams /></Router>
      </Provider>
    );

    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('filters team list', () => {
    const { container } = render(
      <Provider store={store}>
        <Router><Teams /></Router>
      </Provider>
    );
    
    const oldLength = container.querySelectorAll('.card').length;
    userEvent.type(container.querySelector('.form-control'), 'team 1');

    const newLength = container.querySelectorAll('.card').length;
    expect(newLength).toBeLessThan(oldLength);

    userEvent.type(container.querySelector('.form-control'), '{selectall}{del}');
    expect(container.querySelectorAll('.card').length).toBeGreaterThan(newLength);
  });

  it('renders no results after filtering team list', () => {
    const { container, getByText } = render(
      <Provider store={store}>
        <Router><Teams /></Router>
      </Provider>
    );
    
    userEvent.type(container.querySelector('.form-control'), 'wwww');

    expect(container.querySelectorAll('.card').length).toBeFalsy();
    expect(getByText(/no teams found/i)).toBeInTheDocument();
  });
});
