import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    score: 1,
    timer: 1,
  },
  reducers: {
    updateTimer: (state, action) => {
      state.timer = action.payload
    },
    clearTimer: (state) => {
      state.timer = 0;
    },
    incrementScore: (state) => {
      state.score = state.score++;
    },
  },
});

export const {
  updateTimer,
  clearTimer,
  incrementScorer,
} = mainSlice.actions;

export const getTimer = (state) => {
    console.log("s", state.timer)
    return state.timer
};

export default mainSlice.reducer;
