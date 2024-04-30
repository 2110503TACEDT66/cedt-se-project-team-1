"use client"
import Image from 'next/image';
import Link from 'next/link';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { store } from '@/redux/store';
import getUserPoint from '@/libs/User/getUser';
import { setPointReducer } from '@/redux/features/pointslice';

export default function TopMenu() {

    // const session = await getServerSession(authOptions);
    // console.log(session);
    const {data: session} = useSession();
    const points = useSelector((state: any) => state.pointslice.points)
    if(session){
        useEffect(() => {
            getUserPoint(session?.user.data._id ?? '').then((res) => {
                store.dispatch(setPointReducer(res.data.point))
            })
        }, [])
    }else{
        useEffect(() => {
            store.dispatch(setPointReducer(0))
        }, [])
    }


    return (
        <div className="h-[65px] bg-[#c3d6a7] fixed top-0 left-0 right-0 z-30 flex flex-row justify-between rounded-bl-lg rounded-br-lg">
                <Link href='/' className='flex justify-center items-center m-3'>
                    <Image src={'/img/logo1.png'} className="h-[100%] w-auto"
                        alt='logo' width={0} height={0} sizes='100vh' />
                    <div className='px-8 text-xl text-[#426B1F]'>Massage with Girl</div>
                    <div>
                        {
                            session ? (
                            <div className='flex flex-row gap-4'>
                                <p className='text-gray-600'>Welcome, {session.user.data.name}</p>
                                <p className='text-gray-600'>{points} Points</p>
                            </div>
                        ):null
                        }
                    </div>
                </Link>
                <div className='flex'>
                    <div className='flex'>
                    <TopMenuItem title='Massage' pageRef='/massage'/>
                    <TopMenuItem title='My Reservation' pageRef='/myreservation'/>
                    <TopMenuItem title='My point' pageRef='/mypoint'/>
                    {
                        session?.user.data.role === 'admin' ?<TopMenuItem title= 'Ratings' pageRef='/ratingmanagement'/>:
                        null
                    }
                    
                    <div className='w-[150px] flex justify-center items-center ' >
                       {
                        session ? <Link href='/api/auth/signout' className='flex justify-center items-center m-3 bg-[#426B1F] text-[#FFFFFF] px-6 py-2 rounded-xl no-underline'><p>Sign-Out</p></Link>
                            : <Link href='/api/auth/signin' id='buttomTosign' className='flex justify-center items-center m-3 bg-[#426B1F] text-[#FFFFFF] px-6 py-2 rounded-xl no-underline'><p>Sign-In</p></Link>
                        } 
                    </div>
                    
                    </div>
            
                    
                </div>
                
        </div>
    )
}