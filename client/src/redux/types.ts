import type { Todo, TodoID } from '../features/todos/types';
import type { User } from '../features/users/type';

export type TodosState = {
  todos: Todo[];
};

export type AuthState = {
  auth: User | undefined;
};

export type Action =
  | { type: 'todos/load'; payload: Todo[] }
  | { type: 'todos/add'; payload: Todo }
  | { type: 'todos/update'; payload: TodoID }
  | { type: 'todos/remove'; payload: TodoID }
  | { type: 'auth/checkUser'; payload: User }
  | { type: 'auth/logOut' }
  | { type: 'auth/sign-in'; payload: User };
