import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import {loadState, saveState} from './api/localStorage';
import throttle from 'lodash/throttle';
import App from './components/App';

const persistentData = loadState();
const store = createStore(todoApp, persistentData);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  });
}, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
