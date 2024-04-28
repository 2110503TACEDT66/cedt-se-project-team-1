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
import { useSession } from 'next-auth/react';
import addCustomerCoupon from '@/libs/CustomerCoupon/addCustomerCoupon'
import updateUserPoint from '@/libs/User/updateUserPoint'
import { setPoint } from '@/redux/features/userSlice'

import ModalButton from '@/components/ModalButton'

export default function CouponCard({ couponItems, userPoint, updateUserPoint, session }:
    {
        couponItems: CouponItem
        userPoint: number
        updateUserPoint: (newPoint: number) => void
        session: any
    }) {
    const dispatch = useDispatch<AppDispatch>()
    const [massageShop, setMassageShop] = React.useState<MassageItem>({} as MassageItem);
    const [canBuy, setCanBuy] = React.useState<boolean>(true);

    useEffect(() => {
        getMassage(couponItems.massageShop).then((res) => {
            const massage: MassageItem = res.data;
            setMassageShop(massage);
        });
    }, []);

    const handleBuy = async () => {
        if (userPoint > couponItems.point) {
            await addCustomerCoupon(couponItems._id, session?.user.data._id ?? '', massageShop._id).then((res) => {
                if (res.success) {
                    setCanBuy(false);
                    updateUserPoint(userPoint - couponItems.point);
                }
            });
        } else alert('You do not have enough points to buy this coupon')
    }

    return (
        <div className='w-[350px] h-[180px] bg-white shadow-md'>
            <div className='flex flex-row'>
                <div className='bg-[#426B1F] h-[180px] w-[120px] flex justify-center items-center'>
                    <Image src='/img/discount.png' width={60} height={60} alt='coupon' />
                </div>
                <div className='w-full h-[180px] p-4'>
                    <div className='flex'>
                        <div>
                            <Typography variant='h5' fontWeight={"bold"}>{couponItems.discount}%</Typography>
                            <Typography variant='body1' fontWeight={"bold"}>Max {couponItems.coverage} Bath</Typography>
                            <Typography variant='body2'>{couponItems.point} point</Typography>
                            <Typography variant='body2'>{massageShop.name}</Typography>
                        </div>
                        <div className='flex flex-col ml-4 gap-1 mt-[-10px]'>
                            <ModalButton text='Edit' color='gray'>
                                <></>
                            </ModalButton>
                            <div>
                                <button className="rounded-md bg-red-600 hover:bg-red-800 transition px-3 py-1 text-white shadow-sm relative"
                                onClick={(e) => { e.preventDefault(); dispatch(deleteCouponReducer(couponItems._id))}}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end items-end mt-5'>
                        {canBuy ?
                            <RedeemButton onClick={handleBuy}>Buy this Coupon</RedeemButton> :
                            <Button variant='contained' disabled>Bought</Button>
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}
