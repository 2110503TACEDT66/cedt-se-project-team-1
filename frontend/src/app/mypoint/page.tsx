"use client"
import React, { useEffect } from 'react'
import CouponCatalog from './components/CouponCatalog'
import UserInfo from './components/UserInfo'

import { useAppSelector } from '@/redux/store'
import { store } from "@/redux/store";

import getCoupons from '@/libs/Coupon/getCoupons'
import getCouponsByMassageId from '@/libs/Coupon/getCouponsByMassageId'

import { setCouponReducer } from '@/redux/features/couponSlice'

import getAllCustomerCoupons from '@/libs/CustomerCoupon/getAllCustomerCoupons'
import getCustomerCouponByMassage from '@/libs/CustomerCoupon/getCustomerCouponByMassage'

import { useSession } from 'next-auth/react';
import { CouponItem, CouponJson, CustomerCouponItem, CustomerCouponJson, MassageItem, UserProfile, Role, MembershipItem, MembershipJson } from '../../../interface'
import getUserPoint from '@/libs/User/getUser'


import ModalButton from '@/components/ModalButton'
import CouponForm from '@/app/mypoint/components/CouponForm'
import { Button } from '@mui/material'
import getMassageMemberships from '@/libs/Membership/getMassageMemberships'
import getMemberships from '@/libs/Membership/getMemberships'

export default function page({ mid }: { mid: string }) {
  //const [couponItems, setCoupons] = React.useState<CouponItem[]>([])
  const [customerCoupon, setCustomerCoupon] = React.useState<CustomerCouponItem[]>([])
  const { data: session } = useSession();
  const [point, setPoint] = React.useState<number>(0);

  const [memberships, setMemberships] = React.useState<MembershipItem[]>([]);

  const couponItems = useAppSelector(state => state.couponSlice.couponItems);

  useEffect(() => {
    if (session?.user.data._id === undefined) return;
    getUserPoint(session?.user.data._id).then((res) => {
      setPoint(res.data.point)
    })
  }, [])

  const updateUserPoint = (point: number) => {
    setPoint(point);
  }

  useEffect(() => {

    const fetchData = async () => {
      if (mid !== undefined) {

        // Coupon
        try {
          const coupons: CouponJson = await getCouponsByMassageId(mid);
          console.log("Coupons by massage id : ", coupons.data);
          store.dispatch(setCouponReducer(coupons.data));
        } catch (error) {
          console.log('No coupon found')
        }

        // Customer Coupon
        try {
          const customerCoupon: CustomerCouponJson = await getCustomerCouponByMassage(mid);
          setCustomerCoupon(customerCoupon.data);
        } catch (error) {
          console.log('No customer coupon found')
        }

        // Membership
        try {
          const memberships: MembershipJson = await getMassageMemberships(mid);
          setMemberships(memberships.data);
        } catch (error) {
          console.log('No membership found')
        }

      } else {

        // Coupon
        try {
          const coupons: CouponJson = await getCoupons();
          store.dispatch(setCouponReducer(coupons.data));
        } catch (error) {
          console.log('No coupon found')
        }

        // Customer Coupon
        try {
          const customerCoupon: CustomerCouponJson = await getAllCustomerCoupons();
          setCustomerCoupon(customerCoupon.data);
        } catch (error) {
          console.log('No customer coupon found')
        }

        // Membership
        try {
          const memberships: MembershipJson = await getMemberships();
          setMemberships(memberships.data);
        } catch (error) {
          console.log('No membership found')
        }
      }
    }

    fetchData();
  }, []);

  const unusedCoupon = couponItems.filter((coupon: CouponItem) => {
    return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id) && (customerCoupon.user._id === session?.user.data._id)));
    // return !customerCoupon.some((customerCoupon) => customerCoupon.coupon && ((customerCoupon.coupon._id === coupon._id)));
  });

  return (
    <>
      {(mid === undefined) ? <UserInfo userPoint={point} /> : <> </>
      }
      <CouponCatalog
        coupon={unusedCoupon}
        memberships={memberships}
        updateUserPoint={updateUserPoint}
        userPoint={point}
        session={session}
        mid={mid}
      />


      {
        (session?.user.data.role !== Role.User) ? (
          <div id='Totest' className='flex justify-center'>
            <ModalButton  text='Create Coupon' color='green'>
              <CouponForm isUpdate={false} mid={mid} cid={null}/>
            </ModalButton>
          </div>
        ) : null
      }

    </>
  )
}
