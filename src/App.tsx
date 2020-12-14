import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { IStoreState } from './store/types';
import Router from './Router';

interface IAppProps {
  store: Store<IStoreState>;
}

const App = (props: IAppProps) => (
  <Provider store={props.store}>
    <Router />
  </Provider>
);

export default App;
