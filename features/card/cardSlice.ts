import { Card, Language, User } from '@/app/lib/types';
import { getCards } from '@/utils/actions';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUserCards = createAsyncThunk(
  'user/fetchCards',
  async (
    { user, repeat }: { user: User; repeat?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCards(user, repeat);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type CardSlice = {
  cards: { card: Card; reverse: boolean }[] | null;
  correctAnswers: number;
  falseAnswers: number;
  total: number;
  left: number;
  isLoading: boolean;
  currentCardIndex: number;
  isFlipped: boolean;
  complete: boolean;
};

const initialState: CardSlice = {
  cards: null,
  correctAnswers: 0,
  falseAnswers: 0,
  total: 0,
  left: 0,
  isLoading: true,
  currentCardIndex: 0,
  isFlipped: false,
  complete: false,
};

const cardSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {
    setCards: (state, { payload }) => {
      state.total = payload.length;
      state.correctAnswers = 0;
      state.falseAnswers = 0;
      state.cards = payload;
      state.left = payload.length;
      state.currentCardIndex = 0;
      state.isFlipped = false;
      state.complete = false;
    },
    handleCorrectAnswer: (state) => {
      if (state.currentCardIndex + 1 === state.total) state.complete = true;
      state.correctAnswers = state.correctAnswers + 1;
      state.left = state.left - 1;
      state.currentCardIndex = state.currentCardIndex + 1;
      state.isFlipped = false;
    },
    handleFalseAnswer: (state) => {
      if (state.currentCardIndex + 1 === state.total) state.complete = true;
      state.falseAnswers = state.falseAnswers + 1;
      state.left = state.left - 1;
      state.currentCardIndex = state.currentCardIndex + 1;
      state.isFlipped = false;
    },
    setIsFlipped: (state) => {
      state.isFlipped = true;
    },
    reset: (state) => {
      state.total = 0;
      state.correctAnswers = 0;
      state.falseAnswers = 0;
      state.cards = null;
      state.left = 0;
      state.currentCardIndex = 0;
      state.isFlipped = false;
      state.complete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCards.fulfilled, (state, { payload }) => {
        state.total = payload.length;
        state.correctAnswers = 0;
        state.falseAnswers = 0;
        state.cards = payload;
        state.left = payload.length;
        state.currentCardIndex = 0;
        state.isFlipped = false;
        state.isLoading = false;
        state.complete = false;
      })
      .addCase(fetchUserCards.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {
  setCards,
  handleCorrectAnswer,
  handleFalseAnswer,
  setIsFlipped,
  reset,
} = cardSlice.actions;
export default cardSlice.reducer;
