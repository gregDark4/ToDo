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
    // case 'todos/update' : {
    //   return {
    //     ...state ,
    //     todos: state.todos.map((todo) =>
    //       todo.id === action.payload ? { ...todo, adult: !todo.adult } : todo,
    //     ),
    //   };
    // }
    case 'todos/remove':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todosReducer;
