import React from 'react';
import './MainPage.scss';
import { useTheme } from '../../hooks/use_theme';

const MainPage = (): JSX.Element => {
  // const { theme, setTheme } = useTheme();
  return (
    <div className="main__container">
      <video autoPlay loop muted className="video__background">
        <source
          src="https://cdn.dribbble.com/users/62525/screenshots/12909119/media/d28f84def12b19dbbd4822dd0ddc560d.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default MainPage;
