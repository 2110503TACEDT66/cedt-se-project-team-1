import React from 'react'
import TextContent from '@/components/TextContent'
import TextHeader from '@/components/TextHeader'

const TextContainer = ({Header,contant}:{Header:string,contant:string}) => {
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <TextHeader>
        <h2>
            {Header}
        </h2>
      </TextHeader>
      
      <TextContent>
        <p>
           {contant}
        </p>
      </TextContent>
    </div>
  )
}

export default TextContainer