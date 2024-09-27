import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { productsAPI } from "./slice/api";
import clientSlice from "./slice/clientSlice";
import userSlice from "./slice/userSlice";
import { clientApi } from "./slice/clientApi";
import { notesApi } from "./slice/notesApi";
import noteSlice from "./slice/noteSlice";
import { userApi } from "./slice/userApi";
import searchSlice from "./slice/searchSlice";

export const store = configureStore({
  reducer: {
    // clients: clientSlice,
    note: noteSlice,
    user: userSlice,
    search: searchSlice,
    [clientApi.reducerPath]: clientApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    // [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      notesApi.middleware,
      userApi.middleware
    ),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
