import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@saumyaborwankar/thera-notes-api";
const clients = [
  {
    id: "2",
    userId: "userId1",
    firstName: "Client",
    lastName: "Number 2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: "thesaumyaborwankar@gmail.com",
    phoneNumber: "+91 8488897431",
    age: 25,
    address: "D304 Radheshyam",
  },
];

const initialState: Client[] = clients;

export const CLIENTS = "CLIENTS";
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

const clientSlice = createSlice({
  name: CLIENTS,
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
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

export const { setClients } = clientSlice.actions;

export default clientSlice.reducer;
