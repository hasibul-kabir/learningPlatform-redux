import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => `/assignments`
        }),
        getAssignment: builder.query({
            query: (id) => `/assignments?video_id=${id}`,
        }),
        getAssignmentById: builder.query({
            query: (id) => `/assignments/${id}`,
            providesTags: ['assignment']
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: `/assignments`,
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: newAssignment } = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
                        draft.push(newAssignment)
                    }))
                } catch { }
            }
        }),
        editAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['assignment'],
            //pessimistic cache update
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //pessimistic cache update
                try {
                    const { data: updatedAssignment } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
                        const draftToEdit = draft.find((a) => a.id === arg.id);
                        Object.assign(draftToEdit, updatedAssignment)
                    }))
                } catch { }
            }
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //optimistic cache update
                const deletedResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getAssignments",
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

export const { useGetAssignmentsQuery, useGetAssignmentByIdQuery, useGetAssignmentQuery, useAddAssignmentMutation, useEditAssignmentMutation, useDeleteAssignmentMutation } = assignmentApi;