import { createStore, compose } from 'redux';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = compose(
    reduxReactRouter({createHistory})
  )(createStore)(rootReducer, initialState);

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');

      // XXXXX: fails with routing?
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
