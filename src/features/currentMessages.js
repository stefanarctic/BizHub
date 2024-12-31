import { createSlice } from "@reduxjs/toolkit";

export const currentMessagesSlice = createSlice({
    name: 'currentMessages',
    initialState: {
        value: []
    },
    reducers: {
        setCurrentMessages: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentMessages } = currentMessagesSlice.actions;

export default currentMessagesSlice.reducer;