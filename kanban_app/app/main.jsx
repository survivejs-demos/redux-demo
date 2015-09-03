import 'array.prototype.findindex';
import assign from 'es6-object-assign';

assign.polyfill();

import './main.css';

import React from 'react';
import {Provider} from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';
//import storage from './libs/storage';
//import persist from './libs/persist';

const store = configureStore();

main();

function main() {
  //persist(alt, storage, 'app');

  if(process.env.NODE_ENV === 'production') {
    React.render(
      <Provider store={store}>
        {() => <App />}
      </Provider>,
      document.getElementById('app'));
  }
  if(process.env.NODE_ENV !== 'production') {
    const app = document.createElement('div');

    document.body.appendChild(app);

    React.render(
      <Provider store={store}>
        {() => <App />}
      </Provider>,
      app);
  }
}
