import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import {Button} from 'antd'
import { Select } from 'antd';

const { Option } = Select;

const TodosPage = (): JSX.Element => {
  const [filter, setFilter] = useState('all');

  const [showBtn, setShowBtn] = useState(false);
  const todos = useSelector((store: RootState) => store.todos.todos);
  const todoss = useSelector((store: RootState) => store.todos.todos);

  // const [prior, setPrior] = useState('all');

  const sortedTodos = todoss.sort((todoA, todoB) => todoB.level_id - todoA.level_id);

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
            <Button type="primary" id="add_task_btn" onClick={() => setShowBtn((prev) => !prev)}>
              +Add New Task
            </Button>
          )}
        </div>
        <br />
        <div>
          <b>Show</b>
      <Select defaultValue="all" onChange={handleFilter} className="filtr_select">
        <Option value="all">all</Option>
        <Option value="completed">completed</Option>
        <Option value="incomplete">incomplete</Option>
      </Select>
    </div>
      </div>
      {sortedTodos.map((todo) => (
        <div key={todo.id} />
      ))}
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosPage;
