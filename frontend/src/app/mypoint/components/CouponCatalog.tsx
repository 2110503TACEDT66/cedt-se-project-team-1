import React from 'react'
import CouponCard from './CouponCard'
import { CouponItem, MembershipItem } from '../../../../interface'

export default function CouponCatalog({ coupon, memberships, userPoint, updateUserPoint, session, mid }:
  {
    coupon: CouponItem[]
    memberships: MembershipItem[]
    userPoint: number
    updateUserPoint: (newPoint: number) => void
    session: any
    mid: string
  }) 
  
  {
  return (
    <div className='flex justify-center h-full'>
      <div className="grid grid-cols-2 content-around mt-8 w-[800px] gap-4 h-full">
        {(coupon.length === 0) ? <h1>No coupon available</h1> : (
          coupon.map((coupon) => (
            <CouponCard
              key={coupon._id}
              couponItems={coupon}
              userPoint={userPoint}
              updateUserPoint={updateUserPoint}
              session={session}
              mid={mid}
              isMemberCoupon={coupon.usableUserType === 'member'}
              isJoinMember={memberships.some((membership) => membership._id === mid)}
            />
          ))
        )}
      </div>
  
    </div>
  )
}
