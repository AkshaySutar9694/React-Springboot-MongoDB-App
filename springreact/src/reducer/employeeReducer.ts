import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types";

export interface employeeState {
  records: Array<Employee>;
}

const initialState: employeeState = {
  records: [],
};

export const employeeSlice = createSlice({
  name: "employeeRecords",
  initialState,
  reducers: {
    fetchAndStore: (state, action: PayloadAction<Array<Employee>>) => {
      state.records = action.payload;
    },
  },
});

export const { fetchAndStore } = employeeSlice.actions;

export default employeeSlice.reducer;
