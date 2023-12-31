/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { Button } from 'antd';
import type { Todo } from './types';
import { useAppDispatch } from '../../redux/store';

const AddTodoForm = ({ setShowBtn }: { setShowBtn: (prev: any) => void }): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  const onHandleTodoAdd = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
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
    });

    const data: Todo = await res.json();
    dispatch({ type: 'todos/add', payload: data });
    setTitle('');
    setDescription('');
    setShowBtn((prev: boolean) => !prev);
  };
  return (
    <div>
      <form className="form-container">
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
        <Button className="form-submit-button" onClick={onHandleTodoAdd}>
          Create
        </Button>
        <br />
      </form>
    </div>
  );
};

export default AddTodoForm;
