import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name: string;

  profilePictureUrl: string | null;
  occupation: string | null;
  phonenumber: string | null;
  location: string | null;
}
const initialState: User = {
  id: "",
  email: "",
  name: "",
  profilePictureUrl: "",
  occupation: "",
  phonenumber: "",
  location: "",
};

export const USER = "user";

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profilePictureUrl = action.payload.profilePictureUrl;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
