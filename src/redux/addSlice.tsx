import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const addSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    openAddTask: (state: any) => {
      state.value = true;
    },
    closeAddTask: (state: any) => {
      state.value = false;
    },
  },
});
export const { openAddTask, closeAddTask } = addSlice.actions;
export default addSlice.reducer;
