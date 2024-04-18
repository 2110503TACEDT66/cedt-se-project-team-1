import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RatingItem, RatingJson, RatingUpdateData } from "../../../interface";

import addRating from "@/libs/Rating/addRating";
import updateRating from "@/libs/Rating/updateRating";
import deleteRating from "@/libs/Rating/deleteRating";

type RatingState = {
    ratingItems: RatingItem[]
}

const initialState: RatingState = {
    ratingItems: []
}

const ratingSlice = createSlice({
    name: 'rating',
    initialState,
    reducers: {
        setRatingReducer: (state, action: PayloadAction<RatingItem[]>) => {
            state.ratingItems = action.payload
        },
        addRatingReducer: (state, action: PayloadAction<RatingItem>) => {
            const remainRating = state.ratingItems.filter((rating: RatingItem) => rating._id !== action.payload._id)
            remainRating.push(action.payload)
            state.ratingItems = remainRating
            addRating(action.payload.massageShop._id, action.payload)
        },
        updateRatingReducer: (state, action: PayloadAction<RatingItem>) => {
            state.ratingItems = state.ratingItems.map((rating) => {
                if (rating._id === action.payload._id) {
                    updateRating(rating._id, action.payload)
                    return action.payload
                }
                return rating
            })
        },
        deleteRatingReducer: (state, action: PayloadAction<string>) => {
            state.ratingItems = state.ratingItems.filter((rating) => rating._id !== action.payload)
            deleteRating(action.payload)
        }
    }
})

export const { setRatingReducer, addRatingReducer, updateRatingReducer, deleteRatingReducer } = ratingSlice.actions
export default ratingSlice.reducer