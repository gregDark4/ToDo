import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameItem from './GameItem';
import './Games.scss';
import type { RootState } from '../../redux/store';

const GamesPage = (): JSX.Element => {
  const games = useSelector((store: RootState) => store.games.games);
  const navigate = useNavigate();
  return (
    <div className="games__container">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
      <button type="button" onClick={() => navigate(-1)}>
        Назад{' '}
      </button>
    </div>
  );
};

export default GamesPage;
