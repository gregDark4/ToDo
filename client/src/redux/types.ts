import type { Todo, TodoID } from '../features/todos/types';

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
  | { type: 'todos/remove'; payload: TodoID };
