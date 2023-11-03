import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';
import { fetchTodoDelete } from '../../App/api';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const dispatch = useAppDispatch();
  // const [status, setStatus] = useState(todo.status ? 'completed' : 'notCompleted');

  const onHandleChange = async (id: TodoID): Promise<void> => {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ status: !todo.status }),
    });
    const data: { message: string } = await res.json();
    if (data.message === 'success') {
      // setStatus(todo.status ? 'notCompleted' : 'completed');
      dispatch({ type: 'todos/update', payload: id });
    }
  };

  const onHandleDelete = (id: TodoID): void => {
    fetchTodoDelete(id)
      .then(() => dispatch({ type: 'todos/remove', payload: id }))
      .catch(console.log);
  };

  return (
    <div
      className="game__container"
      style={{ borderRadius: '8px', background: 'black', padding: '40px', marginBottom: '20px' }}
    >
      <h2 className="game__title">{todo.title}</h2>
      <p>{todo.description}</p>
      <label>
        Выполнено
        <input type="checkbox" checked={todo.status} onChange={() => onHandleChange(todo.id)} />
      </label>
      {/* <label>
        Status
        <select value={status} onChange={() => onHandleChange(todo.id)}>
          <option value="completed">Выполнено</option>
          <option value="notCompleted">Не выполнено</option>
        </select>
      </label> */}
      <button onClick={() => onHandleDelete(todo.id)} type="button">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
