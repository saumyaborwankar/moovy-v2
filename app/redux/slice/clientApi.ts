import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const CLIENT = "CLIENT";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    // getClients: builder.query<any, string>({
    //   // async queryFn(userId) {
    //   //   try {
    //   //     // return { data: getClients(userId) };
    //   //     return { data: "" };
    //   //   } catch (error) {
    //   //     console.log(error);
    //   //     return { error };
    //   //   }
    //   query: (newUser) => ({
    //     url: "clients/addClient",
    //     method: "POST",
    //     body: newUser,
    //   }),
    // }),
    addClient: builder.mutation<any, ClientDetails>({
      query: (newUser) => ({
        url: "client",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }),
    }),
    deleteClient: builder.mutation<any, QueryClient>({
      query: (deleteClient) => ({
        url: "client",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteClient),
      }),
    }),
  }),
});

export const { useAddClientMutation, useDeleteClientMutation } = clientApi;

interface ClientDetails {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  age: number;
  address?: string;
}

interface QueryClient {
  id: string;
  userId: string;
}
