import React from 'react';
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const dispatch = useAppDispatch();

  const onHandleTodoUPdate = async (id: TodoID): Promise<void> => {
    const res = await fetch(`/api/games/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data: { message: string } = await res.json();
    if (data.message === 'successs') {
      dispatch({ type: 'todos/update', payload: id });
    }
  };

  return (
    <div className="todo__container">
      <div className="todo_quest">
        <h2 className="todo__title">{todo.title}</h2>
        <p>{todo.description}</p>
      </div>
      <label>
        Изменить
        <form onSubmit={onHandleTodoUPdate} />
        <button type="submit">Delete</button>
      </label>
    </div>
  );
};

export default TodoItem;
