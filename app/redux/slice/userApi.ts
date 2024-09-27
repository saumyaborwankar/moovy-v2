import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const USER = "USER";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    // getUser: builder.query<any, string>({
    //   query: (id) => ({
    //     url: "user",
    //     method: "GET",
    //     body: id,
    //   }),
    // }),
    updateUser: builder.mutation<any, UpdateUser>({
      query: (updates) => ({
        url: "user",
        method: "PUT",
        body: JSON.stringify({ updates }),
      }),
    }),
    // verifyEmail: builder.query<any, { token: string; userId: string }>({
    //   query: (verify) => ({
    //     url: "verify-email",
    //     method: "GET",
    //     body: JSON.stringify(verify),
    //   }),
    // }),
  }),
});
export const { useUpdateUserMutation } = userApi;
interface UpdateUser {
  id: string;
  name: string;
  location: string;
  occupation: string;
}
