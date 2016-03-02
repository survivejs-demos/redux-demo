import {createStore, compose} from 'redux';
import {persistState} from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const createStoreWithMiddleware = compose(
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0) ? matches[1] : null;
}

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
