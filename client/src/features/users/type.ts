export type User = {
  id: number;
  email: string;
  password: string;
};

export type UserID = User['id'];
