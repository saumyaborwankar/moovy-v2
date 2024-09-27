import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Search {
  search: string;
}
const initialState: Search = {
  search: "",
};

export const SEARCH = "SEARCH";

const searchSlice = createSlice({
  name: SEARCH,
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
