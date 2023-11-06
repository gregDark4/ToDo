import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';
import { fetchTodoDelete } from '../../App/api';
import Modal from '../Modal/Modal';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const [show, setShow] = useState(false);
  const [prior, setPrior] = useState('all');
  // const todos = useSelector((store: RootState) => store.todos.todos);
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

  const onHandleLevel = async (id: TodoID): Promise<void> => {
    const res = await fetch(`/api/level/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ level_id: prior }),
    });
    const data: { message: string } = await res.json();
    if (data.message === 'success') {
      dispatch({ type: 'todos/level', payload: id });
    }
  };

  const onHandleDelete = (id: TodoID): void => {
    fetchTodoDelete(id)
      .then(() => dispatch({ type: 'todos/remove', payload: id }))
      .catch(console.log);
  };

  const handlePrior = (level_id: string): void => {
    setPrior(level_id);
  };

  // const sortedPrior = prior === 'all' ? todos : todos.filter((tod) => tod.level_id === prior);

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
      <section>
        <h2 className="game__title" onClick={() => setShow(!show)}>
          {todo.title}
        </h2>
        {show && <div id="description">{todo.description}</div>}
      </section>

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
      <select value={prior} onChange={(e) => setPrior(e.target.value)}>
        <option value="all" onClick={() => handlePrior('all')}>
          all
        </option>
        <option value="1" onClick={() => handlePrior('1')}>
          low
        </option>
        <option value="2" onClick={() => handlePrior('2')}>
          middle
        </option>
        <option value="3" onClick={() => handlePrior('3')}>
          high
        </option>
      </select>
      <button
        onClick={() => onHandleLevel(todo.id, prior)}
        type="button"
        style={{
          backgroundColor:
            prior === '1'
              ? 'rgba(0, 255, 0, 0.5)'
              : prior === '3'
              ? 'rgba(255, 0, 0, 0.5)'
              : 'rgba(255, 255, 0, 0.5)',
          color: 'white',
        }}
      >
        Change Level
      </button>
    </div>
  );
};

export default TodoItem;
