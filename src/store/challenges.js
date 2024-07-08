import { createSlice } from "@reduxjs/toolkit";

const initalChallengesState = {
  active: [],
  completed: [],
  failed: [],
}

const challengesSlice = createSlice({
  name: 'chellanges',
  initialState: initalChallengesState,
  reducers: {
    setChellenges(state, payload) {
      const findItems = (status) => payload.chellenges.filter((item) => item.status === status);

      state.active = findItems('active');
      state.completed = findItems('completed');
      state.failed = findItems('failed');
    },
  }
});


export const challengesActions = challengesSlice.actions;

export default challengesSlice.reducer;
