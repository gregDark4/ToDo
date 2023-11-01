/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from '../features/navbar/NavBar';
import MainPage from '../features/main/MainPage';
import ErrorPage from '../features/404/404';
import { useAppDispatch } from '../redux/store';
import * as api from './api';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
// import Memo from '../Samples/Memo/Memo';
// import CallBe4ik from '../Samples/useCallback/Callbe4ik';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/players" element={<TodosPage />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
