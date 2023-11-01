/* eslint-disable @typescript-eslint/default-param-last */
import type { Action, GamesState } from '../types';

export const initState: GamesState = {
  games: [],
};

const gamesReducer = (state: GamesState = initState, action: Action): GamesState => {
  switch (action.type) {
    case 'games/load':
      return {
        ...state,
      };
    case 'games/update':
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload ? { ...game, adult: !game.adult } : game,
        ),
      };
    default:
      return state;
  }
};

export default gamesReducer;
