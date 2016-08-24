import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos, getIsFetching } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchTodos();
  }
  componentDidUpdate(prevProps) {
    const { filter } = this.props;

    if (filter !== prevProps.filter) {
      this.fetchTodos(filter);
    }
  }
  fetchTodos() {
    const { filter, fetchTodos, requestTodos } = this.props;

    requestTodos(filter);
    fetchTodos(filter)
  }
  render() {
    const { toggleTodo, todos, isFetching } = this.props;

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return <TodoList todos={todos} onTodoClick={toggleTodo}/>
  }
}

VisibleTodoList.PropTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  receiveTodos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  requestTodos: PropTypes.func.isRequired
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';

  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getIsFetching(state, filter)
  }
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;
