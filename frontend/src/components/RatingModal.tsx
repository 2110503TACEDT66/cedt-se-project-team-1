import React from 'react'
import { Rating } from '@mui/material'
const RatingModal = () => {
    


  return (
    <div className='flex flex-col gap-3 mt-'>
        <h1 className="font-semibold">
            Rate your experience
        </h1>
        <div className='flex justify-between mt-2'>
            <h1>Service</h1>
            <Rating></Rating>
            
        </div>
        <div className='flex justify-between'>
            <h1>Transportation</h1>
            <Rating></Rating>
            
        </div>
        <div className='flex justify-between'>
            <h1>Price</h1>
            <Rating></Rating>
            
        </div>
        <div className='flex justify-between'>
            <h1>Hygiene</h1>
            <Rating></Rating>
            
        </div>
        <div className='flex flex-col text-start my-4'>
            <h1>Comment</h1>
            <textarea className="resize-none border rounded-md " rows={12}></textarea>
            
        </div>
        <div className='flex justify-center'>   
            <button type='submit' className='text-white rounded-md w-1/3 bg-green-500 hover:bg-green-800'>Submit</button>
        </div>


      
    </div>
  )
}

export default RatingModal
 