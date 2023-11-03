import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';
import { fetchTodoDelete, fetchTodoEdit } from '../../App/api';
import Modal from '../Modal/Modal';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(todo.status ? 'completed' : 'notCompleted');

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
      setStatus(todo.status ? 'notCompleted' : 'completed'); // Обновление статуса после успешного изменения на сервере
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
  console.log(modalActive, todo);

  return (
    <div className="game__container">
      <h2 className="game__title">{todo.title}</h2>
      <a>{todo.description}</a>
      <button onClick={() => setModalActive((prev) => !prev)} type="button">
        Edit
      </button>
      <p>
        <label>
          Status
          <select value={status} onChange={() => onHandleChange(todo.id)}>
            <option value="completed">Выполнено</option>
            <option value="notCompleted">Не выполнено</option>
          </select>
        </label>
        <button onClick={() => onHandleDelete(todo.id)} type="button">
          Delete
        </button>
      </p>
      {/* <div
        onClick={() => {
          setModalActive(true);
          setTitle(title);
          setDescription(description);
        }}
      /> */}
      <div className="modalpj">
        {modalActive && todo && <Modal setModalActive={setModalActive} todo={todo} />}
      </div>
    </div>
  );
};

export default TodoItem;
