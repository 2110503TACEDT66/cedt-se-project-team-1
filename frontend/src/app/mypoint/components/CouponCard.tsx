import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CouponItem, Role } from '../../../../interface'
import getMassage from '@/libs/Massage/getMassage'
import { MassageItem } from '../../../../interface'
import RedeemButton from './RedeemButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { deleteCouponReducer } from '@/redux/features/couponSlice'
import addCustomerCoupon from '@/libs/CustomerCoupon/addCustomerCoupon'
import { setPointReducer } from '@/redux/features/pointslice'

import ModalButton from '@/components/ModalButton'
import CouponForm from './CouponForm'

export default function CouponCard({ couponItems, session, mid, isMemberCoupon,  isJoinMember}:
    {
        couponItems: CouponItem
        session: any
        mid: string
        isMemberCoupon: boolean
        isJoinMember: boolean
    }) {
    const dispatch = useDispatch<AppDispatch>()
    const [massageShop, setMassageShop] = React.useState<MassageItem>({} as MassageItem);
    const [canBuy, setCanBuy] = React.useState<boolean>(true);
    const userPoint = useSelector((state: any) => state.pointslice.points);

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
                    dispatch(setPointReducer(userPoint - couponItems.point));
                }
            });
        } else alert('You do not have enough points to buy this coupon')
    }

    return (
        <div className='w-[350px] h-[180px] bg-white shadow-md'>

            <div className='flex flex-row'>
                <div className={`bg-[#${(isMemberCoupon) ? 'E8BC4C' : '426B1F'}] h-[180px] w-[120px] flex justify-center items-center`}>
                    <Image src='/img/discount.png' width={60} height={60} alt='coupon' />
                </div>
                <div className='w-full h-[180px] p-4'>
                    <div className='flex'>
                        <div className='w-2/3'>
                            <Typography variant='h5' fontWeight={"bold"}>{couponItems.discount}%</Typography>
                            <Typography variant='body1' fontWeight={"bold"}>Max {couponItems.coverage} Bath</Typography>
                            <Typography variant='body2'>{couponItems.point} point</Typography>
                            <Typography variant='body2'>{massageShop.name}</Typography>
                        </div>
                        {
                            (session?.user.data.role !== Role.User) ? (
                                <div className='flex flex-col items-end ml-4 gap-1 w-1/3 mt-[-4.5vh]'>
                                    <ModalButton text='Edit' color='gray'>
                                        <CouponForm isUpdate={true} cid={couponItems._id} mid={massageShop._id} />
                                    </ModalButton>
                                    <div>
                                        <button className="rounded-md bg-red-600 hover:bg-red-800 transition px-3 py-1 text-white shadow-sm relative"
                                            onClick={(e) => { e.preventDefault(); dispatch(deleteCouponReducer(couponItems._id)) }}>Delete</button>
                                    </div>
                                </div>
                            ) : null
                        }

                    </div>
                    <div className='flex justify-end  mt-5'>
                        {
                        
                            !isJoinMember && isMemberCoupon ?
                                <Link href={`/massage/${couponItems.massageShop}/membership`}
                                    className="p-2 text-sm bg-[#E8BC4C] rounded-lg shadow-lg hover:bg-amber-600 hover:text-white ease-i-out duration-300">
                                    Join Membership
                                </Link> :
                            (
                                (canBuy) ? <RedeemButton onClick={handleBuy}>Buy this Coupon</RedeemButton> :
                                <Button variant='contained' disabled>Bought</Button>
                            )

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
