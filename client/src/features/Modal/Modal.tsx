import React, { useState } from 'react';
import './modal.css';
import type { Todo } from '../todos/types';

const Modal = ({
  todo,
  setModalActive,
}: {
  todo: Todo;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const HandelAnswer: React.MouseEventHandler<HTMLButtonElement> = () => {};

  return (
    // <div className={active ? 'modal active': 'modal'} onClick={()=> setActive(false)}>
    // <div className="modal__content" onClick={e.stopPropagation()}>
    <div className="conteiner">
      <div>{todo.id}</div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
      <button type="button" onClick={HandelAnswer}>
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
