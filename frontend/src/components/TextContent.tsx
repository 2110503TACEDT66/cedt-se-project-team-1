import React from 'react'

export default function TextContent({ children }: { children: React.ReactNode }) {

    return (
        <div className='text-lg flex-col flex justify-center items-center w-[1200px] text-center text-[#426B1F]'>
            {children}
        </div>
            
    )
} 