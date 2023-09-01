import { createSlice } from "@reduxjs/toolkit";

export const containerSlice = createSlice({
    name: "container",
    initialState: {
        generating: [],
    },
    reducers: {
        addGeneratingContainer: (state, action) => {
            state.generating.push({
                ...action.payload.container,
                generate: false,
            });
            
            return state;
        },
        updateGenerateState: (state, action) => {
            state.generating = [...state.generating].map(container => {
                if (container.name === action.payload.name) {
                    container.generate = true;
                }

                return container;
            });

            return state;
        },
        clearGeneratingContainer: (state, action) => {
            state.generating = [...state.generating].filter(container => container.name !== action.payload.name);
            
            return state;
        },
    },
});

export const { addGeneratingContainer, updateGenerateState, clearGeneratingContainer } = containerSlice.actions;
export default containerSlice.reducer;