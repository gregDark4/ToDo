/* eslint-disable @typescript-eslint/default-param-last */
import type { Action, UsersState } from '../types';

export const initState: UsersState = {
  users: [],
};

const usersReducer = (state: UsersState = initState, action: Action): UsersState => {
  switch (action.type) {
    case 'users/add':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
