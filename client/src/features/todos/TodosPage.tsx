import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import './Games.scss';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodosPage = (): JSX.Element => {
  const [filter, setFilter] = useState('all');
  const [showBtn, setShowBtn] = useState(false);

  // const [prior, setPrior] = useState('all');
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
        <div>

          {showBtn ? (
            <div id="add_form">
              {' '}
              <AddTodoForm setShowBtn={setShowBtn}/>
            </div>
          ) : (
            <button type="button" id="add_task_btn" onClick={() => setShowBtn((prev)=>!prev)}>
              +Add Task
            </button>
          )}
          {}
        </div>
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
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </div>
  );
};

export default TodosPage;

// <div>
// <select>
//   <option value="all" onClick={() => handlePrior('all')}>
//     all
//   </option>
//   <option value="1" onClick={() => handlePrior('1')}>
//     low
//   </option>
//   <option value="2" onClick={() => handlePrior('2')}>
//     middle
//   </option>
//   <option value="3" onClick={() => handlePrior('3')}>
//     high
//   </option>
// </select>
// {sortedPrior.map((todo) => (
//   <TodoItem key={todo.id} todo={todo} />
// ))}
// </div>
