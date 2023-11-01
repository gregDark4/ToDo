import { legacy_createStore as createStore } from 'redux';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
