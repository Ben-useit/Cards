import { Card, User } from '@/lib/types';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { getCardsAction } from '@/actions/card';

export const fetchUserCards = createAsyncThunk(
  'user/fetchCards',
  async (
    { user, repeat }: { user: User; repeat?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await getCardsAction({ repeat });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type CardSlice = {
  cards: null | { card: Card; reverse: boolean }[];
  correctAnswers: number;
  falseAnswers: number;
  total: number;
  left: number;
  isLoading: boolean;
  currentCardIndex: number;
  isFlipped: boolean;
  complete: boolean;
  redirectTo: string;
  sessionId: string;
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
  redirectTo: '/',
  sessionId: '',
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
      state.isLoading = false;
      state.complete = false;
      state.sessionId = nanoid();
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
    setIsFlipped: (state, { payload }) => {
      state.isFlipped = payload;
    },
    setRedirectTo: (state, { payload }) => {
      state.redirectTo = payload.redirectTo;
    },
    modifyCard: (state, { payload }) => {
      if (!state.cards) return;

      const index = state.currentCardIndex;
      if (index === undefined || index < 0 || index >= state.cards.length)
        return;

      let otherIndex: number | undefined = undefined;

      // There might be another card
      const cards = state.cards;

      if (cards[index]) {
        const targetId = state.cards[index].card.id;
        const indexes = cards
          .map((item, i) => (item.card.id === targetId ? i : null))
          .filter((i) => i !== null);
        otherIndex = indexes.filter((i) => i != index)?.at(0);
      }

      // Merge the existing card with the payload
      state.cards[index] = {
        ...state.cards[index],
        card: {
          ...state.cards[index].card,
          ...payload, // overwrite only the fields provided in payload
        },
      };

      if (otherIndex) {
        state.cards[otherIndex] = {
          ...state.cards[otherIndex],
          card: {
            ...state.cards[otherIndex].card,
            ...payload, // overwrite only the fields provided in payload
          },
        };
      }
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
      state.redirectTo = '/';
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
  setRedirectTo,
  modifyCard,
  reset,
} = cardSlice.actions;
export default cardSlice.reducer;
