/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import type { Todo } from './types';
import { useAppDispatch } from '../../redux/store';
import {Button} from 'antd'

const AddTodoForm = ({ setShowBtn }: { setShowBtn: (prev: boolean) => void }): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const onHandleTodoAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      return;
    }
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
        isData: new Date(),
      }),
    });console.log(res);
    
    const data: Todo = await res.json();
    console.log(data);
    dispatch({ type: 'todos/add', payload: data });
    setTitle('');
    setDescription('');
    setShowBtn((prev) => !prev);
  };
  return (
    <div>
      <form className="form-container" onSubmit={onHandleTodoAdd}>
        <label htmlFor="title" className="form-label">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            className="form-input"
            type="text"
            placeholder="Title"
          />
        </label>
        <label htmlFor="description" className="form-label">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            className="form-input"
            type="text"
            placeholder="Description"
          />
        </label>
        <button
          type="submit"
          className="form-submit-button"
          onClick={() => setShowBtn((prev) => !prev)}
        >
          Add
        </button>
        <br />
      </form>
    </div>
  );
};

export default AddTodoForm;
