import type { Todo, TodoID } from '../features/todos/types';
import type { User } from '../features/users/type';

/* eslint-disable @typescript-eslint/no-unsafe-return */
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todos');
  return res.json();
};

export const fetchCheckUser = async (): Promise<User> => {
  const res = await fetch('/api/auth/check');
  return res.json();
};

export const fetchLogOut = async (): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/logout');
  const data: { message: string } = await res.json();
  return data;
};

export const fetchTodoEdit = async (id: TodoID): Promise<{ message: string }> => {
  const res = await fetch(`/api/edit/${id}`, {
    method: 'put',
  });
return res.json()
};
export const fetchTodoDelete = async (id: TodoID): Promise<{ message: string }> => {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'delete',
  });
  return res.json();
};
