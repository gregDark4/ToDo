/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-empty */
import React, { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.scss';
import { Button } from 'antd';
import { useAppDispatch, type RootState } from '../../redux/store';
import { fetchLogOut } from '../../App/api';
import { useTheme } from '../../hooks/use_theme';

const NavBar = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (theme) {
    }
  }, [theme]);
  //asd

  const handleLightThemeClick = (): void => {
    setTheme('light');
  };
  const handleDarkThemeClick = (): void => {
    setTheme('dark');
  };

  const ButtonGroup = Button.Group;

  const logOut = (): void => {
    fetchLogOut()
      .then((data) => data.message === 'success' && dispatch({ type: 'auth/logOut' }))
      .catch(console.log);
  };

  return (
    <>
      <div className="nav__container">
        <div className="stub" />
        <div>
          <ul className="nav__menu">
            <li>
              <NavLink to="/">Check</NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to="/auth/sign-in">Sign-in</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/sign-up">Sign-up</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/todos">Todos</NavLink>
                </li>
                <li>
                  <NavLink onClick={logOut} to="/">
                    logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="themeBtn">
          <ButtonGroup>
            <Button className="themeButtons" onClick={handleLightThemeClick}>
              light
            </Button>
            <Button className="themeButtons" onClick={handleDarkThemeClick}>
              dark
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default NavBar;
