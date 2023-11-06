/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import type { Todo } from './types';
import { useAppDispatch } from '../../redux/store';

const AddTodoForm = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const onHandleTodoAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await fetch('/api/todos', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        status: false,
        level_id: 1,
      }),
    });
    const data: Todo = await res.json();
    console.log(data);
    dispatch({ type: 'todos/add', payload: data });
    setTitle('');
    setDescription('');
  };
  return (
    <div>
      <form className="form-container" onSubmit={onHandleTodoAdd}>
        <label htmlFor="title" className="form-label">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="form-input"
            type="text"
          />
        </label>
        <label htmlFor="description" className="form-label">
          Description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            className="form-input"
            type="text"
          />
        </label>
        <button type="submit" className="form-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
