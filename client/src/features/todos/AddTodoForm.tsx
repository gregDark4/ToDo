/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import type { Todo } from './types';
import { useAppDispatch } from '../../redux/store';

const AddTodoForm = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [desctiption, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const onHandleTodoAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        desctiption,
      }),
    });
    const data: Todo = await res.json();
    dispatch({ type: 'todos/add', payload: data });
  };

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onHandleTodoAdd}>
        <label htmlFor="">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
          />
        </label>
        <label htmlFor="">
          Description
          <input
            value={desctiption}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            type="text"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
