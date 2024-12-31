import { createSlice } from "@reduxjs/toolkit";

export const currentWorkspaceSlice = createSlice({
    name: 'currentWorkspace',
    initialState: {
        value: {}
    },
    reducers: {
        setCurrentWorkspace: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setCurrentWorkspace } = currentWorkspaceSlice.actions;

export default currentWorkspaceSlice.reducer;