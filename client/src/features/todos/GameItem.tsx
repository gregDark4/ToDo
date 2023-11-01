import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { Game, GameID } from './types';

const GameItem = ({ game }: { game: Game }): JSX.Element => {
  const dispatch = useAppDispatch();

  const onHandleChange = async (id: GameID): Promise<void> => {
    const res = await fetch(`/api/games/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ adult: !game.adult }),
    });
    const data: { message: string } = await res.json();
    if (data.message === 'successs') {
      dispatch({ type: 'games/update', payload: id });
    }
  };

  return (
    <div className="game__container">
      <h2 className="game__title">{game.title}</h2>
      <img className="game__img" src={game.img} alt="game" />
      <p>{game.description}</p>
      <Link to={`/games/${game.id}`}>Подробнее</Link>
      <label>
        Adult
        <input type="checkbox" checked={game.adult} onChange={() => onHandleChange(game.id)} />
      </label>
    </div>
  );
};

export default GameItem;
