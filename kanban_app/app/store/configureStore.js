import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger(
  {
    collapsed: true,
    predicate: (getState, action) => process.env.NODE_ENV !== 'production',
  }
);

const createStoreWithMiddleware = applyMiddleware(
  logger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if(module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
