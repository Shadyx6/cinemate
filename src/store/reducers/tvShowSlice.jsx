import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null
}

const peopleSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getTvShow : (state, action) => {
            console.log(state)
            state.details = action.payload
        },
        removeTvShow : (state) => {
            state.details = null
        }
    }
})

export const { getTvShow, removeTvShow } = peopleSlice.actions;

export default peopleSlice.reducer