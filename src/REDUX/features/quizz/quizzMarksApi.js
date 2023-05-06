import { apiSlice } from "../api/apiSlice";

export const quizzMarksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuizzMarks: builder.query({
            query: () => `/quizMark`
        }),

    })
})

export const { useGetAllQuizzMarksQuery } = quizzMarksApi;