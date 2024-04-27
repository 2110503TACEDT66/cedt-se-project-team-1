import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CouponItem } from '../../../../interface'
import getMassage from '@/libs/Massage/getMassage'
import { MassageItem } from '../../../../interface'
import RedeemButton from './RedeemButton'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { deleteCouponReducer } from '@/redux/features/couponSlice'

export default function CouponCard({couponItems}:{couponItems:CouponItem}) {
    const [massageShop, setMassageShop] = React.useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        getMassage(couponItems.massageShop).then((res) => {
            const massage: MassageItem = res.data
            setMassageShop(massage.name)
        })
    }, [])

    const handleRedeem = () => {
        dispatch(deleteCouponReducer(couponItems._id))

    }
return (
    <div className='w-[350px] h-[160px] bg-white shadow-md'>
            <div className='flex flex-row'>
                    <div className='bg-[#426B1F] h-[160px] w-[120px] flex justify-center items-center'>
                            <Image src='/img/discount.png' width={60} height={60} alt='coupon'/>
                    </div>
                    <div className='w-full h-[160px] p-4'>
                            <Typography variant='h5' fontWeight={"bold"}>{couponItems.discount} Bath</Typography>
                            <Typography variant='body1'>coverage : {couponItems.coverage} Bath</Typography>
                            <Typography variant='body2'>{massageShop}</Typography>
                            <div className='flex justify-end items-end mt-5'>
                               <RedeemButton>Redeem</RedeemButton> 
                            </div>  
                    </div>
            </div>
                    

    </div>
)
}
