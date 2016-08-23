import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchTodos();
  }
  componentDidUpdate(prevProps) {
    const { filter, fetchTodos } = this.props;

    if (filter !== prevProps.filter) {
      fetchTodos(filter);
    }
  }
  fetchTodos() {
    const { filter, fetchTodos } = this.props;

    fetchTodos(filter)
  }
  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo}/>
  }
}

VisibleTodoList.PropTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todos: PropTypes.object.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  receiveTodos: PropTypes.func.isRequired
};

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';

  return {
    todos: getVisibleTodos(state, params.filter || 'all'),
    filter
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
