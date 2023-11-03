/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from '../features/navbar/NavBar';
import ErrorPage from '../features/404/404';
import * as api from './api';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import TodosPage from '../features/todos/TodosPage';
import { useAppDispatch } from '../redux/store';
import MainPage from '../features/main/MainPage';
// import Memo from '../Samples/Memo/Memo';
// import CallBe4ik from '../Samples/useCallback/Callbe4ik';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    api.fetchTodos().then((data) => dispatch({ type: 'todos/load', payload: data }));
    api.fetchCheckUser().then((data) => dispatch({ type: 'auth/checkUser', payload: data }));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
