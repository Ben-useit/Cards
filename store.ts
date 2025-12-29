import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import cardReducer from '@/features/card/cardSlice';
import navigationReducer from '@/features/navigation/navigationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    card: cardReducer,
  },
});

// We export a function so we can create a new instance per request
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      card: cardReducer,
      // add other reducers here
    },
    // Adding devTools only in development
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// these lines are required for typescript
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
