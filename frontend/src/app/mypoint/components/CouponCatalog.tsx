import React from 'react'
import CouponCard from './CouponCard'
import { CouponItem } from '../../../../interface'

export default function CouponCatalog({ coupon, userPoint, updateUserPoint, session }:
  {
    coupon: CouponItem[]
    userPoint: number
    updateUserPoint: (newPoint: number) => void
    session: any
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
            />
          ))
        )}
      </div>
    </div>
  )
}
