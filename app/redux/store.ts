import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { productsAPI } from "./slice/api";
import clientSlice from "./slice/clientSlice";

export const store = configureStore({
  reducer: {
    clients: clientSlice,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
