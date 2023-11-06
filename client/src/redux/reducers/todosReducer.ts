/* eslint-disable @typescript-eslint/default-param-last */
import type { Action, TodosState } from '../types';

export const initState: TodosState = {
  todos: [],
};

const todosReducer = (state: TodosState = initState, action: Action): TodosState => {
  switch (action.type) {
    case 'todos/load':
      return {
        ...state,
        todos: action.payload,
      };
    case 'todos/add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'todos/update':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, status: !todo.status } : todo,
        ),
      };
    case 'todos/remove':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'todos/edit':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, title: todo.title, description: todo.description }
            : todo,
        ),
      };
    case 'todos/level':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, level_id: todo.level_id } : todo,
        ),
      };
    default:
      return state;
  }
};

export default todosReducer;
