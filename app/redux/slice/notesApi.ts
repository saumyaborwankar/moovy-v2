import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const NOTE = "NOTE";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    addNote: builder.mutation<any, NoteDetails>({
      query: (newUser) => ({
        url: "note",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }),
    }),
    deleteNote: builder.mutation<any, QueryNote>({
      query: (deleteNote) => ({
        url: "note",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteNote),
      }),
    }),
    updateNote: builder.mutation<any, UpdateNote>({
      query: (updateNote) => ({
        url: "note",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateNote),
      }),
    }),
  }),
});

export const {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} = notesApi;

interface NoteDetails {
  userId: string;
  clientId: string;
  content: string;
}

interface QueryNote {
  id: string;
  userId: string;
}

interface UpdateNote extends QueryNote {
  content: string;
}
