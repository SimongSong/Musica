import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    score: 1,
    timer: 1,
    tab: [],
    tempo: 0,
    playing : false
  },
  reducers: {
    updateTimer: (state, action) => {
      state.timer = action.payload;
    },
    clearTimer: (state) => {
      state.timer = 0;
    },
    incrementScore: (state) => {
      state.score = state.score++;
    },
    updatePlayingStatus: (state, action) => {
      console.log(action)
      state.playing = action.payload
    },
    loadTab: (state, action) => {
      state.tab = action.payload.tab;
      state.tempo = action.payload.tempo;
    },
  },
});

export const {
  loadTab,
  updateTimer,
  updatePlayingStatus,
  clearTimer,
  incrementScorer,
} = mainSlice.actions;

export const getTimer = (state) => {
  console.log("s", state.timer);
  return state.timer;
};

export default mainSlice.reducer;
