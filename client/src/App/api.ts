import type { Todo } from '../features/todos/types';

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todos');
  return res.json();
};
