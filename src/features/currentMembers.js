import { createSlice } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { usersCollection } from "../firebase/FirebaseSetup";

export const currentMembersSlice = createSlice({
    name: 'currentMembers',
    initialState: {
        value: []
    },
    reducers: {
        setCurrentMembers: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getCurrentMembers = async memberIds => {
    const userSnapshot = await getDocs(usersCollection);
    const users = userSnapshot.docs.map(doc => doc.data());

    const members = users.filter(user => memberIds.includes(user.uid));

    return members;
}

export const { setCurrentMembers } = currentMembersSlice.actions;

export default currentMembersSlice.reducer;