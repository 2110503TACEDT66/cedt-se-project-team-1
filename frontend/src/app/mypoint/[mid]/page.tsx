"use client"
import React, { useEffect } from 'react'
import CouponCatalog from '../components/CouponCatalog'
import UserInfo from '../components/UserInfo'

import { useAppSelector } from '@/redux/store'
import { store } from "@/redux/store";

import getCoupons from '@/libs/Coupon/getCoupons'
import getCouponsByMassageId from '@/libs/Coupon/getCouponsByMassageId'

import { setCouponReducer } from '@/redux/features/couponSlice'

import getAllCustomerCoupons from '@/libs/CustomerCoupon/getAllCustomerCoupons'
import getCustomerCouponByMassage from '@/libs/CustomerCoupon/getCustomerCouponByMassage'

import { useSession } from 'next-auth/react';
import { CouponItem, CouponJson, CustomerCouponItem, CustomerCouponJson, MassageItem, UserProfile } from '../../../../interface'
import getUserPoint from '@/libs/User/getUser'

export default function page({ params }: { params: { mid: string } }) {
    const [couponItems, setCoupons] = React.useState<CouponItem[]>([])
    const [customerCoupon, setCustomerCoupon] = React.useState<CustomerCouponItem[]>([])
    const { data: session } = useSession();
    const [point, setPoint] = React.useState<number>(0);

    useEffect(() => {
        getUserPoint(session?.user.data._id ?? '').then((res) => {
            setPoint(res.data.point)
        })
    }, [])

    const updateUserPoint = (point: number) => {
        setPoint(point);
    }

    useEffect(() => {

        const fetchData = async () => {
            if (params.mid !== undefined) {

                try {
                    const coupons: CouponJson = await getCouponsByMassageId(params.mid);
                    console.log("Coupons by massage id : ", coupons.data);
                    setCoupons(coupons.data);
                } catch (error) {
                    console.log('No coupon found')
                }

                try {
                    const customerCoupon: CustomerCouponJson = await getCustomerCouponByMassage(params.mid);
                    setCustomerCoupon(customerCoupon.data);
                } catch (error) {
                    console.log('No customer coupon found')
                }

            } else {
                try {
                    const coupons: CouponJson = await getCoupons();
                    setCoupons(coupons.data);
                } catch (error) {
                    console.log('No coupon found')
                }

                try {
                    const customerCoupon: CustomerCouponJson = await getAllCustomerCoupons();
                    setCustomerCoupon(customerCoupon.data);
                } catch (error) {
                    console.log('No customer coupon found')
                }
            }
        }

        fetchData();
    }, []);

    const unusedCoupon = couponItems.filter((coupon) => {
        return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id) && (customerCoupon.user._id === session?.user.data._id)));
        // return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id)));
    });

    return (
        <>
            <UserInfo userPoint={point} />
            <CouponCatalog
                coupon={unusedCoupon}
                updateUserPoint={updateUserPoint}
                userPoint={point}
                session={session}
            />
        </>
    )
}
