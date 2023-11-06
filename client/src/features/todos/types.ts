export type Todo = {
  id: number;
  title: string;
  user_id: number;
  description: string;
  status: boolean;
  isData: Date;
  level_id: string;
};

export type TodoID = Todo['id'];
