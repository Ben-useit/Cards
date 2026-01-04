import { Language, User } from '@/lib/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const showMe = createAsyncThunk('/users', async (_, thunkAPI) => {
  try {
    const resp = await fetch('/api/me', { method: 'GET' });
    const data = resp.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch user');
  }
});

type UserSlice = {
  user: User | null;
  isLoading: boolean;
};

const initialState: UserSlice = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signInUser: (state, { payload }) => {
      state.user = payload;
    },
    signOutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showMe.fulfilled, (state, action) => {
        const { user } = action.payload;
        if (user) {
          state.user = user;
        }
        state.isLoading = false;
      })
      .addCase(showMe.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { signInUser, signOutUser } = userSlice.actions;
export default userSlice.reducer;
