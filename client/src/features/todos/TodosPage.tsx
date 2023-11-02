import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Games.scss';
import type { RootState } from '../../redux/store';

const TodosPage = (): JSX.Element => {
  const todos = useSelector((store: RootState) => store.todos.todos);
  const navigate = useNavigate();
  return (
    <div className="games__container">
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
      <button type="button" onClick={() => navigate(-1)}>
        Назад{' '}
      </button>
    </div>
  );
};

export default TodosPage;
