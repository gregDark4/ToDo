import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import './Games.scss';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodosPage = (): JSX.Element => {
  const [filter, setFilter] = useState('all');
  const todos = useSelector((store: RootState) => store.todos.todos);
  const handleFilter = (status): void => {
    setFilter(status);
  };
  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos =
    filter === 'all' ? todos : todos.filter((todo) => todo.status === (filter === 'completed'));

  return (
    <div className="todo__container">
      <div>
        <AddTodoForm />
        <div>
          <button type="button" onClick={() => handleFilter('all')}>
            Все
          </button>
          <button type="button" onClick={() => handleFilter('completed')}>
            Завершенные
          </button>
          <button type="button" onClick={() => handleFilter('incomplete')}>
            Незавершенные
          </button>
        </div>
      </div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosPage;
