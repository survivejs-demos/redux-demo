import { createStore, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers';

export default function configureStore(initialState, routes) {
  const store = compose(
    reduxReactRouter({routes, createHistory})
  )(createStore)(rootReducer, initialState);

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
