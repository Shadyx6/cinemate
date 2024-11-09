import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null
}

const tvShowSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        getPeople : (state, action) => {
            console.log(state)
            state.details = action.payload
        },
        removePeople : (state, action) => {
            state.details = null
        }
    }
})

export const { getPeople, removePeople } = tvShowSlice.actions;

export default tvShowSlice.reducer