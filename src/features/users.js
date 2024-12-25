import { createSlice } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { usersCollection } from "../firebase/FirebaseSetup";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        value: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getUsers = async () => {
    const userSnapshot = await getDocs(usersCollection);
    const users = userSnapshot.docs.map(doc => doc.data());
    return users;
}

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;