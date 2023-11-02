import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './Games.scss';
import type { RootState } from '../../redux/store';
import AddUserForm from './AddTodoForm';
import TodoItem from './TodoItem';

const TodosPage = (): JSX.Element => {
  const todos = useSelector((store: RootState) => store.todos.todos);
  return (
    <div className="todos__container">
      <AddUserForm />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosPage;
