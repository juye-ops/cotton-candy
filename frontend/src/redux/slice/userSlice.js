import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.id = action.payload.id;
            
            return state;
        },
        clearUser: (state) => {
            state.id = "";
            
            return state;
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;