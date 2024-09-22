// import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { clientTable } from "@/lib/db/schema";
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Client } from "@saumyaborwankar/thera-notes-api";
import { eq } from "drizzle-orm";
export const CLIENT = "CLIENT";
export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => `users`,
    }),
  }),
});

export const { useGetProductByNameQuery } = productsAPI;
