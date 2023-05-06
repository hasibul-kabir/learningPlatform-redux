import { apiSlice } from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //get marks by specific student id
        getMyAssignmentsMarks: builder.query({
            query: (studentId) => `assignmentMark?student_id=${studentId}`
        }),

        //get marks by specific student id and assignment id
        getAssignmentMarks: builder.query({
            query: ({ assignmentId, studentId }) => `assignmentMark?assignment_id=${assignmentId}&&student_id=${studentId}`,
            providesTags: ['myassignmentsMark']
        }),

        getAllAssignmentMarks: builder.query({
            query: () => `/assignmentMark`
        }),
        //add new assignment marks by submitting
        submitAssignment: builder.mutation({
            query: (data) => ({
                url: `/assignmentMark`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['myassignmentsMark']
        }),

        updateAssignmentsMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedMark } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData("getAllAssignmentMarks", undefined, (draft) => {
                        const draftToUpdate = draft.find((a) => a.id === arg.id);
                        Object.assign(draftToUpdate, updatedMark)
                    }))

                } catch { }
            }
        })

    })
})

export const { useGetMyAssignmentsMarksQuery, useGetAssignmentMarksQuery, useGetAllAssignmentMarksQuery, useSubmitAssignmentMutation, useUpdateAssignmentsMarkMutation } = assignmentMarksApi;