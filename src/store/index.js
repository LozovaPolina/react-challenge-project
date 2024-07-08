import { configureStore } from "@reduxjs/toolkit";
import challengesSlice from "./challenges";

const store = configureStore({
  reducer: {
    challenges: challengesSlice,
  }
});

export default store;