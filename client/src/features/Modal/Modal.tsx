import React, { useState } from 'react';
import './modal.css';
import { Input, Button } from 'antd';
import type { Todo, TodoID } from '../todos/types';
import { useAppDispatch } from '../../redux/store';

const Modal = ({
  todo,
  setModalActive,
}: {
  todo: Todo;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const dispatch = useAppDispatch();

  // const onHandleEdit = async (id: TodoID): Promise<void> => {
  //   const res = await fetch(`/api/edit/${id}`, {
  //     method: 'put',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({ title, description }),
  //   });
  //   const data: { message: string } = await res.json();
  //   if (data.message === 'success') {
  //     dispatch({ type: 'todos/edit', payload: id });
  //   }
  //   setTitle('');
  //   setDescription('');
  // };
  const onHandleEdit = async (id: TodoID): Promise<void> => {
    const res = await fetch(`api/edit/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const data = await res.json();
    console.log(data);
    dispatch({ type: 'todos/edit', payload: data });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="conteiner">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
      <Button type="default" onClick={() => onHandleEdit(todo.id)}>
        Update
      </Button>
      <Button type="default" onClick={() => setModalActive(false)}>
        X
      </Button>
    </div>
  );
};

export default Modal;
