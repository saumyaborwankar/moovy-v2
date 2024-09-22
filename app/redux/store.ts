import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { productsAPI } from "./slice/api";
import clientSlice from "./slice/clientSlice";
import userSlice from "./slice/userSlice";
import { clientApi } from "./slice/clientApi";
import { notesApi } from "./slice/notesApi";

export const store = configureStore({
  reducer: {
    // clients: clientSlice,
    user: userSlice,
    [clientApi.reducerPath]: clientApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    // [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware, notesApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
