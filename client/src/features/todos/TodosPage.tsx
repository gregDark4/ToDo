import React from 'react';
import { useSelector } from 'react-redux';
// import './Games.scss';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodosPage = (): JSX.Element => {
  const todos = useSelector((store: RootState) => store.todos.todos);
  return (
    <div className="todos__container">
      <div>
        <AddTodoForm />
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosPage;
