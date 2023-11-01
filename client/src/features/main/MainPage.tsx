import React from 'react';
import './MainPage.scss';
import img from '../../assets/foxes.png';

const MainPage = (): JSX.Element => {
  return (
    <div className="main__container">
      <h1>Лисята</h1>
      <img className="main__poster" src={img} alt="main" />
    </div>
  );
};

export default MainPage;
