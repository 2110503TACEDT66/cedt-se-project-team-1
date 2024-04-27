import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CouponItem } from "../../../interface";

import updateCoupon from "@/libs/Coupon/updateCoupon";
import createCoupon from "@/libs/Coupon/createCupon";
import deleteCoupon from "@/libs/Coupon/deleteCoupon";

type CouponState = {
    couponItems: CouponItem[]
}

const initialState: CouponState = {
    couponItems: []
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCouponReducer: (state, action: PayloadAction<CouponItem[]>) => {
            state.couponItems = action.payload
        },
        addCouponReducer: (state, action: PayloadAction<CouponItem>) => {
            const remainCoupon = state.couponItems.filter((coupon: CouponItem) => coupon._id !== action.payload._id)
            remainCoupon.push(action.payload)
            state.couponItems = remainCoupon
            createCoupon(action.payload)
        },
        updateCouponReducer: (state, action: PayloadAction<CouponItem>) => {
            state.couponItems = state.couponItems.map((coupon) => {
                if (coupon._id === action.payload._id  ) {
                    updateCoupon(coupon._id, action.payload)
                    return action.payload
                }
                return coupon
            })
        },
        deleteCouponReducer: (state, action: PayloadAction<string>) => {
            state.couponItems = state.couponItems.filter((coupon) => coupon._id !== action.payload)
            deleteCoupon(action.payload)
        }
    },
});

export const { setCouponReducer, addCouponReducer, updateCouponReducer, deleteCouponReducer } = couponSlice.actions

export default couponSlice.reducer
