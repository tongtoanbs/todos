import { createStore } from 'redux';
import todoApp from './reducers';
import {loadState, saveState} from './api/localStorage';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const persistentData = loadState();
  const store = createStore(todoApp, persistentData);

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};

export default configureStore;