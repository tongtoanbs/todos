import * as api from '../api';
import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import * as fromSchema from '../reducers/schema';

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response =>
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, fromSchema.todo)
    })
  );

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise().resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, fromSchema.arrayOfTodos)
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        errorMessage: error.message || 'Oop!'
      })
    }
  );
};