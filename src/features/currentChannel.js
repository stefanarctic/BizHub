import { createSlice } from "@reduxjs/toolkit";

export const currentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: {
        value: -1
    },
    reducers: {
        setCurrentChannel: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;