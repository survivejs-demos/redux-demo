import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { Route, Link } from 'react-router';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';

const APP_STORAGE = 'app';

const store = configureStore(storage.get(APP_STORAGE) || {});

class Root extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={App}>
              <Route path=":name" component={App} />
            </Route>
          </ReduxRouter>
        </Provider>
      </div>
    );
  }
}

main();

function main() {
  store.subscribe(() => {
    if(!storage.get('debug')) {
      storage.set(APP_STORAGE, store.getState());
    }
  });

  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<Root />, app);
}
