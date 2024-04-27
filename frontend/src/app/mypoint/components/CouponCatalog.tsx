import React from 'react'
import CouponCard from './CouponCard'

export default function CouponCatalog() {
  return (
    <div className='flex justify-center'>
        <div className="grid grid-cols-2 content-around mt-8 w-[800px] gap-4">
            <CouponCard promotion='15% off' description='description'/>
            <CouponCard promotion='15% off' description='description'/>
            <CouponCard promotion='15% off' description='description'/>
            <CouponCard promotion='15% off' description='description'/>
            <CouponCard promotion='15% off' description='description'/>  
        </div>
    </div>
  )
}
