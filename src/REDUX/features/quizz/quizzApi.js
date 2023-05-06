import { apiSlice } from "../api/apiSlice";

export const quizzApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuizzes: builder.query({
            query: () => `/quizzes`
        }),
        getQuizzById: builder.query({
            query: (id) => `/quizzes/${id}`,
            providesTags: ['quizz']
        }),
        getCorrespondingQuizzes: builder.query({
            query: (id) => `/quizzes?video_id=${id}`
        }),
        addQuizz: builder.mutation({
            query: (data) => ({
                url: `/quizzes`,
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newQuizz } = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getAllQuizzes', undefined, (draft) => {
                        draft.push(newQuizz)
                    }))
                } catch { }
            }
        }),
        editQuizz: builder.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['quizz'],
            //pessimistic cache update
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //pessimistic cache update
                try {
                    const { data: updatedQuizz } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData("getAllQuizzes", undefined, (draft) => {
                        const draftToEdit = draft.find((a) => a.id === arg.id);
                        Object.assign(draftToEdit, updatedQuizz)
                    }))
                } catch { }
            }
        }),
        deleteQuizz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //optimistic cache update
                const deletedResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAllQuizzes",
                        undefined,
                        (draft) => {
                            //  JSON.parse(JSON.stringify(draft));
                            draft.splice(draft.findIndex(a => a.id === arg), 1)
                        })
                )
                try {
                    await queryFulfilled
                } catch {
                    deletedResult.undo()
                }
            }
        })
    })
})

export const { useGetAllQuizzesQuery, useGetQuizzByIdQuery, useGetCorrespondingQuizzesQuery, useAddQuizzMutation, useEditQuizzMutation, useDeleteQuizzMutation } = quizzApi;