import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import type { User } from '../users/type';
import { useAppDispatch } from '../../redux/store';

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onHandlePlayerAdd = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      return;
    }
    const res = await fetch('/api/auth/sign-in', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data: { message: string; user: User } = await res.json();
    if (data.message === 'success') {
      dispatch({ type: 'auth/sign-in', payload: data.user });
      navigate('/');
    }
  };

  return (
    <>
      <h1>SignIn</h1>
      <div className="regLog">
        <Form style={{ display: 'flex', flexDirection: 'column' }}>
          <label id="r" htmlFor="a">
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </label>
          <label id="r" htmlFor="d">
            Password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="text"
            />
          </label>
          <br />
          <Button className="form-submit-button" onClick={onHandlePlayerAdd}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignIn;
