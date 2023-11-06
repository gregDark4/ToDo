import React, { useState } from 'react';
import './modal.css';
// import { useActionData } from 'react-router-dom';
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
  // const onHandleEdit = (id: TodoID): void => {
  // api
  // .fetchTodoEdit(id)
  // .then(() => dispatch({ type: 'todos/edit', payload: id }))
  // .catch(console.log);
  // };
  const onHandleEdit = async (id: TodoID): Promise<void> => {
    const res = await fetch(`/api/edit/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    const data: { message: string } = await res.json();
    if (data.message === 'success') {
      dispatch({ type: 'todos/edit', payload: id });
    }
    setTitle('');
    setDescription('');
  };
  return (
    // <div className={active ? 'modal active': 'modal'} onClick={()=> setActive(false)}>
    // <div className="modal__content" onClick={e.stopPropagation()}>
    <div className="conteiner">
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
      <button type="button" onClick={() => onHandleEdit(todo.id)}>
        Ответить
      </button>
      <button type="button" onClick={() => setModalActive(false)}>
        X
      </button>
    </div>
    // </div>
    // </div>
  );
};

export default Modal;
