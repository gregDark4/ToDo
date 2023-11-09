/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar } from 'react-date-range';
import {
  EditOutlined,
  CloseSquareOutlined,
  ScheduleOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import type { RootState } from '../../redux/store';
import { useTheme } from '../../hooks/use_theme';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAppDispatch } from '../../redux/store';
import type { Todo, TodoID } from './types';
import { fetchTodoDelete } from '../../App/api';
import Modal from '../Modal/Modal';

const TodoItem = ({ todo }: { todo: Todo }): JSX.Element => {
  const [modalActive, setModalActive] = useState(false);
  const [show, setShow] = useState(false);
  const [prior, setPrior] = useState('1');
  const [calendar, setCalendar] = useState(false);
  const [time, setTime] = useState<Date>();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const deadlineTime = new Date(todo.isData).getTime();
      const timeDiff = deadlineTime - currentTime;
      const seconds = Math.floor(timeDiff / 1000);
      setCountdown(seconds);
      if (seconds <= 0) {
        clearInterval(interval);
      }
    });

    return () => clearInterval(interval);
  }, [todo.isData]);

  useEffect(() => {
    if (countdown >= 604800) {
      setPrior('1');
    }
    if (countdown <= 604800 && countdown >= 259200) {
      setPrior('2');
    }
    if (countdown <= 259200) {
      setPrior('3');
    }
  }, [countdown]);

  const onHandleTime = async (id: TodoID): Promise<void> => {
    const res = await fetch(`/api/time/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ isData: time }),
    });
    const data: { message: string } = await res.json();
    if (data.message === 'success') {
      dispatch({ type: 'todos/time', payload: id });
    }
  };

  const handleTime = (selectedDate) => {
    const createdDate = new Date(todo.createdAt);
    const timeDiff = selectedDate.getTime() - createdDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    setDeadline(daysDiff);
  };

  const saveStateToLocalStorage = (): void => {
    localStorage.setItem(`deadline_${todo.id}`, JSON.stringify(deadline));
  };

  const loadStateFromLocalStorage = (): void => {
    const savedDate = localStorage.getItem('selectedDate');
    if (savedDate) {
      setSelectedDate(new Date(savedDate));
    }
  };

  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [deadline]);

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

  // const handlePrior = (level_id: string): void => {
  //   setPrior(level_id);
  // };

  const handleTimeLineClick = async (todo: Todo): Promise<void> => {
    await onHandleTime(todo.id);
    setCalendar((prev) => !prev);
  };

  // const { theme, setTheme } = useTheme();
  return (
    <div
      className="game__container"
      // style={{
      //   borderRadius: '8px',
      //   background: 'rgba(33,33,36, 0.6',
      //   padding: '40px',
      //   marginBottom: '20px',
      // }}
    >
      <div className="allElemOfTask">
        {/* <label>
           <input
             className="btn"
             type="checkbox"
             checked={todo.status}
             onClick={() => onHandleChange(todo.id)}
           />
         </label> */}
        <div>
          <Button
            className="btn"
            onClick={() => onHandleChange(todo.id)}
            type="button"
            id="btnFinishTask"
            icon={<StarOutlined style={{ color: todo.status ? '#f1d222' : 'initial' }} />}
          />
        </div>
        <div className="title">
          {' '}
          <b className="game__title" onClick={() => setShow(!show)}>
            {todo.title}
          </b>
        </div>
        <div id="editDel">
          <div>
            <Button
              className="btn"
              onClick={() => setModalActive((prev) => !prev)}
              type="button"
              id="btnEditTask"
              icon={<EditOutlined />}
            />
          </div>
          <div>
            <Button
              onClick={() => onHandleDelete(todo.id)}
              type="button"
              id="btnDeleteTask"
              icon={<CloseSquareOutlined />}
            />
          </div>
        </div>
      </div>
      <div id='descript'>
      {show && <div id="description">{todo.description}</div>}
      </div>
      
      <div>
        {calendar ? (
          <>
            {' '}
            <Calendar date={time} onChange={(date) => setTime(date)} minDate={new Date()} />
          </>
        ) : (
          <Button
            type="button"
            id="btnShowCalendar"
            icon={<ScheduleOutlined />}
            onClick={() => setCalendar((prev) => !prev)}
          />
        )}
      </div>
      <br />
      <div className="modalpj">
        {modalActive && todo && <Modal setModalActive={setModalActive} todo={todo} />}
      </div>
      <Button
        onClick={() => onHandleLevel(todo.id, prior)}
        type="button"
        icon={<ClockCircleOutlined />}
        style={{
          backgroundColor:
            prior === '1'
              ? 'rgba(0, 255, 0, 0.5)'
              : prior === '3'
              ? 'rgba(255, 0, 0, 0.5)'
              : 'rgba(255, 255, 0, 0.5)',
          color: 'white',
        }}
      />
      {calendar && (
        <Button
          type="default"
          className="form-submit-button"
          onClick={() => handleTimeLineClick(todo)}
        >
          Set deadline
        </Button>
      )}
    </div>
  );
};

export default TodoItem;
