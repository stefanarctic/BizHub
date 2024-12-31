import { createSlice } from "@reduxjs/toolkit";

export const joinedWorkspacesSlice = createSlice({
    name: 'joinedWorkspaces',
    initialState: {
        value: []
    },
    reducers: {
        setJoinedWorkspaces: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setJoinedWorkspaces } = joinedWorkspacesSlice.actions;

export default joinedWorkspacesSlice.reducer;