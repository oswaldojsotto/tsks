import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { dateSplitter } from "../utilities/dateSplitter";

const initialState = {
  value: [
    {
      id: uuidv4(),
      title: "Take the dog out",
      date: "5 mins ago",
      description: "For a walk at the park",
    },
    {
      id: uuidv4(),
      date: "This morning",
      title: "Make some Pasta",
      description: "With chicken and bacon",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: any, action: PayloadAction<string>) => {
      state.value.unshift(action.payload);
      // console.log(state.value);
    },
    deleteTask: (state: any, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (items: any) => items.id !== action.payload
      );
    },
    editTask: (state: any, action) => {
      const { id, title, date, description } = action.payload;
      const dateParsed = JSON.parse(date);
      const findTask = state.value.find((task: any) => task.id === id);
      if (findTask) {
        findTask.title = title;
        findTask.description = description;
        findTask.date = dateSplitter(dateParsed);
      }
    },
  },
});
export const { addTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
