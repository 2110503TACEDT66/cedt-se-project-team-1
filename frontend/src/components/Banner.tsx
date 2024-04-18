"use client"
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

    const [index, setIndex] = useState(0);
    const coverList = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
    const router = useRouter();
    
    const { data: session } = useSession();
    console.log(session?.user)

    return (
        <div className="block m-0 w-full h-[500px] relative" onClick={() => setIndex(index+1)}>
            
            <Image src="/img/massasge.jpg"
            alt = 'cover'
            sizes='100vw'
            width={0}
            height={0}
            className="absolute w-full h-[500px] object-cover z-10 filter brightness-[50%]"
            priority
            />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center text-white text-2xl">
                <h1 className='text-4xl font-bold mb-4 ' style={{ lineHeight: '1.5' }}>Massage with Girl</h1>
                <h3 className='text-2xl'>เราคืออาบ อบ นวดที่ดีที่สุดในย่าน พัฒนาการ อ่อนนุช ศรีนครินทร์</h3>
            </div>
            <button className='bg-[#426B1F] text-stone-50 hover:text-[#426B1F] hover:bg-stone-50 transition-all p-4 rounded-2xl z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-24'
                onClick={(e) => { e.stopPropagation(); router.push('/massage') }}>
                Select Your Massage
            </button>
        </div>
    )
}