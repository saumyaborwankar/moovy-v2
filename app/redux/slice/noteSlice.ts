import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@saumyaborwankar/thera-notes-api";
const notes: Note[] = [
  {
    id: "note1",
    userId: "userId1",
    clientId: "2",
    content: "note 1 containst stuff",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "note2",
    userId: "userId1",
    clientId: "2",
    content: "note 2 also containst stuff",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "note3",
    userId: "userId1",
    clientId: "2",
    content: "note 3 maybe containst stuff",
    createdAt: new Date("2024-01-15T08:30:00Z").toISOString(),
    updatedAt: new Date("2024-01-15T08:30:00Z").toISOString(),
  },
  {
    id: "note4",
    userId: "userId1",
    clientId: "2",
    content: "note 4 can containst stuff",
    createdAt: new Date("2024-01-25T11:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-25T11:00:00Z").toISOString(),
  },
  {
    id: "note5",
    userId: "userId1",
    clientId: "2",
    content: "note 5 will containst stuff",
    createdAt: new Date("2024-02-25T16:00:00Z").toISOString(),
    updatedAt: new Date("2024-02-25T16:00:00Z").toISOString(),
  },
];

const initialState: Note[] = notes;

export const NOTE = "NOTE";
// export const validateAccessToken = createAsyncThunk<UserResponse>(
//   `${USER}/validateAccessToken`,
//   async (_accessToken, { rejectWithValue }) => {
//     try {
//       const headers = LocalStorage.getAuthorizationHeaders();
//       const { data } = await Api.Auth.validate(headers); // if this passed the user is logged in
//       return data;
//     } catch (error: any) {
//       console.log("validation fail", error);
//       try {
//         const refreshHeaders = LocalStorage.getRefreshAuthorizationHeaders();

//         //trying to get new tokens
//         const { data } = await Api.Auth.refresh(refreshHeaders);
//         LocalStorage.setTokens(data.tokens);

//         return data.user;
//       } catch (e: any) {
//         // refresh token is invalid
//         return rejectWithValue(e.response.data);
//       }
//     }
//   }
// );

const noteSlice = createSlice({
  name: NOTE,
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state = action.payload;
    },
    // setUserDetails: (state, action: PayloadAction<UserResponse>) => {
    //   state.email = action.payload.email;
    //   state.username = action.payload.username;
    //   state.firstName = action.payload.firstName;
    //   state.lastName = action.payload.lastName;
    //   state.createdAt = action.payload.createdAt;
    //   state.updatedAt = action.payload.updatedAt;
    // },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(
  //         validateAccessToken.fulfilled,
  //         (state, action: PayloadAction<UserResponse>) => {
  //           state.loggedIn = true;
  //           state.email = action.payload.email;
  //           state.username = action.payload.username;
  //           state.firstName = action.payload.firstName;
  //           state.lastName = action.payload.lastName;
  //           state.createdAt = action.payload.createdAt;
  //           state.updatedAt = action.payload.updatedAt;
  //         }
  //       )
  //       .addCase(validateAccessToken.rejected, (state, action) => {
  //         state.loggedIn = false;
  //         LocalStorage.logout();
  //         console.error("Token validation failed:", action.payload);
  //       });
  //   },
});

export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
