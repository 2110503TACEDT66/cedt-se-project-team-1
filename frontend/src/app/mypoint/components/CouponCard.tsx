import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function CouponCard({promotion,description}:{promotion:string,description:string}) {
  return (
    <div className='w-[350px] h-[120px] bg-white shadow-md'>
        <div className='flex flex-row'>
            <div className='bg-[#426B1F] h-[120px] w-[120px] flex justify-center items-center'>
                <Image src='/img/discount.png' width={60} height={60} alt='coupon'/>
            </div>
            <div className='p-4'>
                <Typography variant='h5' fontWeight={"bold"}>{promotion}</Typography>
                <p>{description}</p>
            </div>
        </div>
    </div>
  )
}
