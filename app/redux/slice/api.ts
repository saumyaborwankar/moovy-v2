import { validateRequest } from "@/lib/auth";
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
    getClients: builder.query<any, void>({
      async queryFn() {
        try {
          const user = await validateRequest();
          if (user) {
            const userId = user.user?.id!;
            const clients = await db.query.clientTable.findMany({
              where: eq(clientTable.userId, userId),
            });
            return { data: clients };
          }
          return { error: "Not authorized" };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetProductByNameQuery, useGetClientsQuery } = productsAPI;
