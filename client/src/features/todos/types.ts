export type Game = {
  id: number;
  title: string;
  img: string;
  description: string;
  adult: boolean;
  player_id: number;
};

export type GameID = Game['id'];
