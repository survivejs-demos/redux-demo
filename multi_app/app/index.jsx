import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import storage from './libs/storage';
import createRoot from './Root.jsx';

const APP_STORAGE = 'app';

const store = configureStore(storage.get(APP_STORAGE) || {});
const Root = createRoot(store);

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
