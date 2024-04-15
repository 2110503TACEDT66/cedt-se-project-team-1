import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MassageItem, MassageJson } from "../../../interface";
import { store } from "../store";

import getMassages from "@/libs/Massage/getMassages";
import createMassage from "@/libs/Massage/createMassage";
import updateMassage from "@/libs/Massage/updateMassage";
import deleteMassage from "@/libs/Massage/deleteMassage";

type MassageState = {
    massageItems: MassageItem[]
}

const initialState: MassageState = {
    massageItems: []
}

const massageSlice = createSlice({
    name: 'massage',
    initialState,
    reducers: {
        setMassageReducer: (state, action: PayloadAction<MassageItem[]>) => {
            state.massageItems = action.payload
        },
        addMassageReducer: (state, action: PayloadAction<MassageItem>) => {
            const remainMassage = state.massageItems.filter((massage: MassageItem) => massage.id !== action.payload.id)
            remainMassage.push(action.payload)
            state.massageItems = remainMassage
            createMassage(action.payload)
        },
        updateMassageReducer: (state, action: PayloadAction<MassageItem>) => {
            state.massageItems = state.massageItems.map((massage) => {
                if (massage.id === action.payload.id) {
                    updateMassage(massage.id, action.payload)
                    return action.payload
                }
                return massage
            })
        },
        deleteMassageReducer: (state, action: PayloadAction<string>) => {
            state.massageItems = state.massageItems.filter((massage) => massage.id !== action.payload)
            deleteMassage(action.payload)
        }
    },
});

export const { setMassageReducer, addMassageReducer, updateMassageReducer, deleteMassageReducer } = massageSlice.actions

export default massageSlice.reducer

// Fetch data and update initialState
// getMassages().then((res:MassageJson) => {
//     store.dispatch(setMassageReducer(res.data));
// });