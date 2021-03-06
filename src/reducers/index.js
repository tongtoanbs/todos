import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  'active': createList('active'),
  'all': createList('all'),
  'completed': createList('completed')
});

const todos = combineReducers({byId, listByFilter});

export default todos;

export const getVisibleTodos = (state, filter) => {
  const allIds = fromList.getIds(state.listByFilter[filter]);

  return allIds.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);