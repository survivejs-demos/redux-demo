import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import {Provider} from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';

const APP_STORAGE = 'app';

const store = configureStore(storage.get(APP_STORAGE) || {});

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
