import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import { combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { Route, Link } from 'react-router';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';

const APP_STORAGE = 'app';

// TODO: define a separate entry point for index + use separate stores for each kanban
const routes = (
  <Route path="/" component={App}>
    <Route path=":name" component={App} />
  </Route>
);

const store = configureStore(storage.get(APP_STORAGE) || {}, routes);

main();

function main() {
  store.subscribe(() => {
    if(!storage.get('debug')) {
      storage.set(APP_STORAGE, store.getState());
    }
  });

  const app = document.createElement('div');

  document.body.appendChild(app);

  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    app);
}
