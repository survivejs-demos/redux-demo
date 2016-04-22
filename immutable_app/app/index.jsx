import React from 'react';
import ReactDOM from 'react-dom';
import {fromJS} from 'immutable';
import Root from './containers/Root.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';

const APP_STORAGE = 'immutable_kanban';

const store = configureStore(deserialize(storage.get(APP_STORAGE)));

store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE, serialize(store.getState()));
  }
});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
);

function serialize(state) {
  const serializedState = {};

  Object.keys(state).forEach(k => serializedState[k] = state[k].toJS());

  return serializedState;
}

function deserialize(state) {
  const deserializedState = {};

  Object.keys(state || {}).forEach(k => deserializedState[k] = fromJS(state[k]));

  return deserializedState;
}
