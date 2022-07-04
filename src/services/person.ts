// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Person {
  id?: number
  name: string
  number: string
}

// Define a service using a base URL and expected endpoints
export const personApi = createApi({
  reducerPath: 'personApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/`,
    prepareHeaders: (headers) => {
      headers.set('apikey', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')
      headers.set(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      )
      return headers
    },
  }),
  tagTypes: ['Person'],
  endpoints: (builder) => ({
    getPersonsData: builder.query<Person[], void>({
      query: () => `rest/v1/person?select=*'`,
      providesTags: [{ type: 'Person', id: 'LIST' }],
    }),
    addPerson: builder.mutation<void, Person>({
      query(Person) {
        return {
          url: `/rest/v1/person`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: Person,
        }
      },
      invalidatesTags: [{ type: 'Person', id: 'LIST' }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPersonsDataQuery, useAddPersonMutation } = personApi
