import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/users`
        }),

    })
})

export const { useGetAllUsersQuery } = usersApi;