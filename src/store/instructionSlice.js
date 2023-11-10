import { createSlice } from "@reduxjs/toolkit";

const instructionSlice = createSlice({
  name: "instruction",
  initialState: {
    instructionIsVisible: false,
  },
  reducers: {
    setInstructionIsVisible(state) {
      state.instructionIsVisible = true;
    },
    setInstructionIsNotVisible(state) {
      state.instructionIsVisible = false;
    },
  },
});

export const { setInstructionIsVisible, setInstructionIsNotVisible } =
  instructionSlice.actions;

export default instructionSlice.reducer;
