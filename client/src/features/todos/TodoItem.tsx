import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';
import { fetchTodoDelete } from '../../App/api';
import Modal from '../Modal/Modal';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
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

  // const onHandleEdit = (id: TodoID): void => {
  //   fetchTodoEdit(id)
  //     .then(() => dispatch({ type: 'todos/edit', payload: id }))
  //     .catch(console.log);
  // };

  const onHandleDelete = (id: TodoID): void => {
    fetchTodoDelete(id)
      .then(() => dispatch({ type: 'todos/remove', payload: id }))
      .catch(console.log);
  };

  return (
    <div
      className="game__container"
      style={{
        borderRadius: '8px',
        background: 'rgba(0,0,0, 0.5',
        padding: '40px',
        marginBottom: '20px',
      }}
    >
      <h2 className="game__title">{todo.title}</h2>
      <a>{todo.description}</a>
      <br />
      <br />
      <label>
        Выполнено
        <input
          className="btn"
          type="checkbox"
          checked={todo.status}
          onChange={() => onHandleChange(todo.id)}
        />
      </label>
      <button className="btn" onClick={() => setModalActive((prev) => !prev)} type="button">
        Edit
      </button>
      <p>
        <button onClick={() => onHandleDelete(todo.id)} type="button">
          Delete
        </button>
      </p>
      <div className="modalpj">
        {modalActive && todo && <Modal setModalActive={setModalActive} todo={todo} />}
      </div>
    </div>
  );
};

export default TodoItem;
