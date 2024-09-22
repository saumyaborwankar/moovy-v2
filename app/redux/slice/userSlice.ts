import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  userId: string;
}
const initialState: User = {
  userId: "",
};

export const USER = "user";

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
