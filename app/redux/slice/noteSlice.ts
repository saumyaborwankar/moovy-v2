import { Note } from "@/lib/db/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface NoteSlice {
  currentNote: Note;
  selectedNote: boolean;
  newNote: boolean;
}
const note: NoteSlice = {
  currentNote: {
    id: "",
    userId: "",
    createdAt: null,
    clientId: "",
    content: "",
    updatedAt: null,
  },
  selectedNote: false,
  newNote: false,
};

const initialState: NoteSlice = note;

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
    // setNoteSlice: (state, action: PayloadAction<NoteSlice>) => {
    //   if (action.payload.newNote) {
    //     state.newNote = action.payload.newNote;
    //     state.currentNote = action.payload.currentNote;
    //     state.selectedNote = action.payload.selectedNote;
    //   }
    // },
    setCurrentNote: (state, action: PayloadAction<Note>) => {
      state.currentNote = action.payload;
      state.selectedNote = true;
    },
    setNewNote: (state, action: PayloadAction<boolean>) => {
      state.newNote = action.payload;
      state.selectedNote = false;
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

export const { setCurrentNote, setNewNote } = noteSlice.actions;

export default noteSlice.reducer;
