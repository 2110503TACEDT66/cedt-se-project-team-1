import React from 'react'


export default function TextHeader({ children }: { children: React.ReactNode }) {

    return (
        <div className='text-3xl flex flex-col justify-center items-center border-b-2 border-[#426B1F] w-[500px] pb-4 text-[#426B1F] mb-5'>
            {children}
        </div>
            
    )
} 