import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodosPage = (): JSX.Element => {
  const [filter, setFilter] = useState('all');

  const [showBtn, setShowBtn] = useState(false);

  // const [prior, setPrior] = useState('all');

  const todoss = useSelector((store: RootState) => store.todos.todos);
  const sortedTodos = todoss.sort((todoA, todoB) => todoB.level_id - todoA.level_id);

  const todos = useSelector((store: RootState) => store.todos.todos);
  const handleFilter = (status: string): void => {
    setFilter(status);
  };
  const filteredTodos =
    filter === 'all' ? todos : todos.filter((todo) => todo.status === (filter === 'completed'));

  return (
    <div className="todo__container">
      <div>
        <div>
          {showBtn ? (
            <div id="add_form">
              <AddTodoForm setShowBtn={setShowBtn} />
            </div>
          ) : (
            <button type="button" id="add_task_btn" onClick={() => setShowBtn((prev) => !prev)}>
              +Add Task
            </button>
          )}
        </div>
        <div>
          <button type="button" onClick={() => handleFilter('all')}>
            all
          </button>
          <button type="button" onClick={() => handleFilter('completed')}>
            completed
          </button>
          <button type="button" onClick={() => handleFilter('incomplete')}>
            incomplete
          </button>
        </div>
      </div>
      {sortedTodos.map((todo) => (
        <div key={todo.id} />
      ))}
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <footer>
        За помощью обращайтесь по номеру:
        <p>+7 (812) 246-27-08</p>
        <p>+7 (812) 246-27-98</p>
        <p>+7 (812) 246-10-51</p>
      </footer>
    </div>
  );
};

export default TodosPage;
