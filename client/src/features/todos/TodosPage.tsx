import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import './Games.scss';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
// import Date from './Date';

const TodosPage = (): JSX.Element => {
  const [filter, setFilter] = useState('all');
  // const user = useSelector((store: RootState) => store.auth.auth);
  // const [prior, setPrior] = useState('all');
  const todoss = useSelector((store: RootState) => store.todos.todos);
  const sortedTodos = todoss.sort((todoA, todoB) => todoB.level_id - todoA.level_id);
  const todos = useSelector((store: RootState) => store.todos.todos);
  const handleFilter = (status: string): void => {
    setFilter(status);
  };

  // const handlePrior = (level): void => {
  //   setPrior(level);
  // };

  const filteredTodos =
    filter === 'all' ? todos : todos.filter((todo) => todo.status === (filter === 'completed'));

  // const sortedPrior =
  //   prior === 'all' ? todos : todos.filter((todo) => todo.level_id === (prior === '1'));

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
      {sortedTodos.map((todo) => (
        <div key={todo.id} />
      ))}
      {/* {user && user.id === todos.user_id ? (
        <> */}
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {/* <Date /> */}
      {/* </>
      ) : null} */}
    </div>
  );
};

export default TodosPage;
