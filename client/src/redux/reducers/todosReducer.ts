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
    default:
      return state;
  }
};

export default todosReducer;
