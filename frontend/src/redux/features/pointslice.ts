import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type pointState = {
    points: number
}

const initialState: pointState = {
    points: 0
}

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        setPointReducer: (state, action: PayloadAction<number>) => {
            state.points = action.payload
        },
        addPointReducer: (state, action: PayloadAction<number>) => {
            state.points += action.payload
        },
        subtractPointReducer: (state, action: PayloadAction<number>) => {
            state.points -= action.payload
        }
    },
});

export const { setPointReducer, addPointReducer, subtractPointReducer } = pointSlice.actions

export default pointSlice.reducer