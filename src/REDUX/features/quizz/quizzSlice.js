import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    marks: []
}

const quizzSlice = createSlice({
    name: "quizz",
    initialState,
    reducers: {

    }
})
export default quizzSlice.reducer;
export const { myMarks } = quizzSlice.actions;