import { createSlice } from "@reduxjs/toolkit";

export interface FilteringState {
  gender: "boys" | "girls";
  directory?: string;
  sort: "popular" | "highToLow" | "lowToHigh";
}

const initialState: FilteringState = {
  gender: "boys",
  directory: undefined,
  sort: "popular",
};

const filteringSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    toggleFilteringGender: (state) => {
      state.gender = state.gender === "boys" ? "girls" : "boys";
    },
    setDirectory: (state, action) => {
      state.directory = action.payload;
    },
    clearDirectory: (state) => {
      state.directory = undefined;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { toggleFilteringGender, setDirectory, clearDirectory, setSort } =
  filteringSlice.actions;
export default filteringSlice.reducer;
