import { Language } from '@/app/lib/types';
import { createSlice } from '@reduxjs/toolkit';

type NavigationSlice = {
  path: string;
  isLoading: boolean;
};

const initialState: NavigationSlice = {
  path: '/',
  isLoading: true,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: initialState,
  reducers: {
    setPath: (state, { payload }) => {
      state.path = payload.path;
    },
  },
  //extraReducers:{}
});
export const { setPath } = navigationSlice.actions;
export default navigationSlice.reducer;
