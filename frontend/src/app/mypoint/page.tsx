"use client"
import React,{ useEffect } from 'react'
import CouponCatalog from './components/CouponCatalog'
import UserInfo from './components/UserInfo'
import { useAppSelector } from '@/redux/store'
import getCoupon from '@/libs/Coupon/getCoupon'
import getCoupons from '@/libs/Coupon/getCoupons'
import { store } from "@/redux/store";
import { setCouponReducer } from '@/redux/features/couponSlice'
import getAllCustomerCoupons from '@/libs/CustomerCoupon/getAllCustomerCoupons'
import { useSession } from 'next-auth/react';
import { CouponItem, MassageItem, UserProfile } from '../../../interface'

interface CustomerCoupon {
    _id: string,
    coupon: CouponItem,
    user: UserProfile["data"],
    massageShop: MassageItem,
}

export default function page() {
    const [couponItems, setCoupons] = React.useState<CouponItem[]>([])
    const [customerCoupon, setCustomerCoupon] = React.useState<CustomerCoupon[]>([])
    const { data: session } = useSession();

    useEffect(() => {
      getCoupons().then((res) => {
        setCoupons(res.data);
      });
      getAllCustomerCoupons().then((res) => {
        setCustomerCoupon(res.data);
      });
    }, []);

    const unusedCoupon = couponItems.filter((coupon) => {
      return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id) && (customerCoupon.user._id === session?.user.data._id)));
      // return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id)));
    });

  return (
    <>    
        <UserInfo/>
        <CouponCatalog coupon={unusedCoupon}/>
    </>
  )
}
