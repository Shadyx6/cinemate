import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null
}

const peopleSlice = createSlice({
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

export const { getPeople, removePeople } = peopleSlice.actions;

export default peopleSlice.reducer