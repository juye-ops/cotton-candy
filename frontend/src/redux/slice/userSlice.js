import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: "",
        refreshToken: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            
            return state;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;

            return state;
        },
        clearUser: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            
            return state;
        },
    },
});

export const { loginUser, updateAccessToken, clearUser } = userSlice.actions;
export default userSlice.reducer;