import { createStore } from 'redux';
import todoApp from './reducers';

const configureStore = () => {
  const store = createStore(
    todoApp,
    process.env.NODE_ENV !== 'production' ? window.devToolsExtension && window.devToolsExtension() : null
  );

  return store;
};

export default configureStore;