import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getMovie : (state, action) => {
            console.log(state)
            state.details = action.payload
        },
        removeMovie : (state, action) => {
            state.details = null
        }
    }
})

export const { getMovie, removeMovie } = movieSlice.actions;

export default movieSlice.reducer