/* eslint-disable @typescript-eslint/default-param-last */
import type { Action, AuthState } from '../types';

export const initState: AuthState = {
  users: [],
};

const usersReducer = (state: AuthState = initState, action: Action): AuthState => {
  switch (action.type) {
    case 'users/add':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
