import React from 'react'
import CouponCard from './CouponCard'
import { CouponItem } from '../../../../interface'

export default function CouponCatalog({coupon}:{coupon:CouponItem[]}) {
  return (
    <div className='flex justify-center h-full'>
        <div className="grid grid-cols-2 content-around mt-8 w-[800px] gap-4 h-full">
            {coupon.map((coupon) => (
                <CouponCard key={coupon._id} couponItems={coupon}/>
            ))}
        </div>
    </div>
  )
}
