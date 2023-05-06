import { apiSlice } from "../api/apiSlice";


export const videoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => `/videos`
        }),
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: ['video']
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: `/videos`,
                method: "POST",
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    //pessimistic cache update
                    const { data: newVideo } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
                        draft.push(newVideo);
                    }));
                } catch { }
            }
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ['video'],
            //pessimistic cache update
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //pessimistic cache update
                try {
                    const { data: updatedVideo } = await queryFulfilled;
                    dispatch(apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                        const draftToEdit = draft.find((a) => a.id === arg.id);
                        Object.assign(draftToEdit, updatedVideo)
                    }))
                } catch { }
            }
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                //optimistic cache update
                const deletedResult = dispatch(
                    apiSlice.util.updateQueryData(
                        "getVideos",
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

export const { useGetVideosQuery, useGetVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = videoApi;