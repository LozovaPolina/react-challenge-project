import { createSlice } from "@reduxjs/toolkit";

const initalChallengesState = {
  active: [],
  completed: [],
  failed: [],
  selectedType: 'active',
}

const challengesSlice = createSlice({
  name: 'chellanges',
  initialState: initalChallengesState,
  reducers: {
    setChallenges(state, action) {

      const findItems = (status) => action.payload.challenges.filter((item) => item.status === status);
      state.active = findItems('active');
      state.completed = findItems('completed');
      state.failed = findItems('failed');
    },
    setSelectedTab(state, action) {
      state.selectedType = action.payload.selectedType
    },

  }
});


export const challengesActions = challengesSlice.actions;

export default challengesSlice.reducer;
