"use client"
import React,{ useEffect } from 'react'
import CouponCatalog from './components/CouponCatalog'
import UserInfo from './components/UserInfo'
import { useAppSelector } from '@/redux/store'
import getCoupon from '@/libs/Coupon/getCoupon'
import getCoupons from '@/libs/Coupon/getCoupons'
import { store } from "@/redux/store";
import { setCouponReducer } from '@/redux/features/couponSlice'

export default function page() {
    const couponItems = useAppSelector(state => state.couponSlice.couponItems)

    useEffect(() => {
        getCoupons().then((res) => {
            store.dispatch(setCouponReducer(res.data))
        })
    }, [])

  return (
    <>    
        <UserInfo/>
        <CouponCatalog coupon={couponItems}/>
    </>
  )
}
