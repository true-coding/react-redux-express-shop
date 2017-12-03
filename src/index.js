// Startup point for the client side application
import 'babel-polyfill';
import React             from 'react';
import ReactDOM          from 'react-dom';
import {
  createStore,
  applyMiddleware
}                        from 'redux';
import thunk             from 'redux-thunk';
import { Provider }      from 'react-redux';
import { renderRoutes }  from 'react-router-config';
import axios             from 'axios';
import Routes            from '../shared/Routes';
import reducers          from '../shared/reducers';
import logger            from 'redux-logger';


import history           from '../shared/lib/history';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../shared/assets/styles/styles.scss';

const axiosInstance = axios.create({
  baseURL: '/api'
});

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance)/*, logger*/)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>{renderRoutes(Routes)}</div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);
