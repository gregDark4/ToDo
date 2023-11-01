/* eslint-disable @typescript-eslint/default-param-last */

import type { Action, AuthState } from '../types';

export const initState: AuthState = {
  auth: undefined,
};

const authReducer = (state: AuthState = initState, action: Action): AuthState => {
  switch (action.type) {
    case 'auth/checkPlayer':
      return {
        ...state,
        auth: action.payload,
      };
    case 'auth/logOut':
      return {
        ...state,
        auth: undefined,
      };
    case 'auth/sign-in':
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
