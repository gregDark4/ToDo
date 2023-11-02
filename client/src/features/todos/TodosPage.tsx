import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Games.scss';
import type { RootState } from '../../redux/store';
import AddUserForm from './AddTodoForm';

const TodosPage = (): JSX.Element => {
  const todos = useSelector((store: RootState) => store.todos.todos);
  const navigate = useNavigate();
  return (
    <div className="todos__container">
      <AddUserForm />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <button type="button" onClick={() => navigate(-1)}>
        Назад{' '}
      </button>
    </div>
  );
};

export default TodosPage;
