import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter != prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }
  render() {
    return <TodoList {...this.props}/>
  }
}

VisibleTodoList.PropTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']),
  todos: PropTypes.object.isRequired,
  onTodoClick: PropTypes.func.isRequired
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
  { onTodoClick: toggleTodo }
)(VisibleTodoList));

export default VisibleTodoList;
