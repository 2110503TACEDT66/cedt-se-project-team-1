"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
import { AiOutlineUser, AiOutlineGift } from 'react-icons/ai';
import getUserPoint from '@/libs/User/getUser';
import { useSelector } from 'react-redux';
import { store } from '@/redux/store';
import { setPointReducer } from '@/redux/features/pointslice';

export default function UserInfo() {
    const {data: session} = useSession();
    const points = useSelector((state: any) => state.pointslice.points)
    
    return (
        <div className='w-full h-[300px] p-10 flex flex-col items-center'>
            <Typography variant='h3' fontWeight={"bold"} color={"#426B1F"}>Promotion Code</Typography>
        {
            session ?
            <div className='w-[300px] h-[100px] bg-[#426B1F] p-4 flex flex-col gap-4 mt-8'>
                <div className='flex flex-row gap-2'>
                    <AiOutlineUser size={24} color='white'/>
                    <p className='text-white'>{session.user.data.name}</p> 
                </div>
                <div className='flex flex-row gap-2'>
                    <AiOutlineGift size={24} color='white'/>
                    <p className='text-white'>{points} point</p>
                </div>
               
            </div>
             :null
        }
        </div>
    )
}
