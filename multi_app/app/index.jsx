import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { Route, Link } from 'react-router';
import configureStore from './store/configureStore';
import storage from './libs/storage';

import Home from './views/Home.jsx';
import Board from './views/Board.jsx';

const APP_STORAGE = 'app';

const store = configureStore(storage.get(APP_STORAGE) || {});

class Root extends React.Component {
  // XXX: render Home, figure out why routing resets to root
  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Board}>
              <Route path=":name" component={Board} />
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
