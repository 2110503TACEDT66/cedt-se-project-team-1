import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CouponItem, CouponItemRedux } from "../../../interface";
import {store} from "../store";

import updateCoupon from "@/libs/Coupon/updateCoupon";
import createCoupon from "@/libs/Coupon/createCupon";
import deleteCoupon from "@/libs/Coupon/deleteCoupon";
import getCouponsByMassageId from "@/libs/Coupon/getCouponsByMassageId";
import getCoupons from "@/libs/Coupon/getCoupons";

type CouponState = {
    couponItems: CouponItem[]
}

const initialState: CouponState = {
    couponItems: []
}

interface CouponCreated {
    success: boolean,
    data: CouponItem
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCouponReducer: (state, action: PayloadAction<CouponItem[]>) => {
            state.couponItems = action.payload
        },
        addCouponReducer: (state, action: PayloadAction<CouponItemRedux>) => {
            createCoupon(action.payload).then((res: CouponCreated) => {
                if (res.success) {
                    if (action.payload.isMassageShop) {
                        getCouponsByMassageId(action.payload.massageShop).then((res) => {
                            store.dispatch(setCouponReducer(res.data))
                        })
                    } else {
                        getCoupons().then((res) => {
                            store.dispatch(setCouponReducer(res.data))
                        })
                    }
                }
            })
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
