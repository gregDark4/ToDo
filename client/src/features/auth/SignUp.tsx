import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import type { Player } from '../players/type';
import { useNavigate } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onHandlePlayerAdd = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res = await fetch('/api/auth/sign-up', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        age,
        avatar,
        email,
        password,
      }),
    });
    const data: { message: string; player: Player } = await res.json();
    if (data.message === 'success') {
      dispatch({ type: 'auth/sign-in', payload: data.player });
      dispatch({ type: 'players/add', payload: data.player });
      navigate('/');
    }
  };

  return (
    <>
      <h1>SignUp</h1>
      <div>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onHandlePlayerAdd}>
          <label htmlFor="d">
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" />
          </label>
          <label htmlFor="a">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </label>
          <label htmlFor="d">
            Avatar
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              name="avatar"
              type="text"
            />
          </label>
          <label htmlFor="a">
            Age
            <input value={age} onChange={(e) => setAge(e.target.value)} name="age" type="number" />
          </label>
          <label htmlFor="d">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="text"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
