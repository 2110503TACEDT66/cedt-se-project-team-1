"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';
import { AiOutlineUser, AiOutlineGift } from 'react-icons/ai';
import getUserPoint from '@/libs/User/getUser';
import { useSelector } from 'react-redux';

export default function UserInfo({userPoint}: {userPoint: number}) {
    const {data: session} = useSession();
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
                    <p className='text-white'>{userPoint} point</p>
                </div>
               
            </div>
             :null
        }
        </div>
    )
}
