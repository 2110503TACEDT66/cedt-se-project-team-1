import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import addRating from '@/libs/Rating/addRating';
import { RatingItem } from '../../../../interface';

import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { store } from '@/redux/store';
import { deleteReservationReducer } from '@/redux/features/reservationSlice';
import getRatings from '@/libs/Rating/getRatings';
import { setRatingReducer, updateRatingReducer } from '@/redux/features/ratingSlice';

const RatingModal = ({ shopID, reservationID }: { shopID: string, reservationID: string }) => {

    // const ratingItems = useAppSelector(state => state.ratingSlice.ratingItems);

    // useEffect(() => {
    //     getRatings().then((res) => {
    //         store.dispatch(setRatingReducer(res.data))
    //     })
    // })


    // State variables to store rating values for different categories
    const [serviceRating, setServiceRating] = useState<number | null>(null);
    const [transportationRating, setTransportationRating] = useState<number | null>(null);
    const [priceRating, setPriceRating] = useState<number | null>(null);
    const [hygieneRating, setHygieneRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // New loading state
    const dispatch = useDispatch<AppDispatch>();
    
    const handleServiceRatingChange = (newValue: number | null) => {
        setServiceRating(newValue);
    };

    const handleTransportationRatingChange = (newValue: number | null) => {
        setTransportationRating(newValue);
    };

    const handlePriceRatingChange = (newValue: number | null) => {
        setPriceRating(newValue);
    };

    const handleHygieneRatingChange = (newValue: number | null) => {
        setHygieneRating(newValue);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        if (loading) return; // If already loading, prevent multiple submissions

        setLoading(true); // Set loading state to true when submission starts

        if (serviceRating == null || transportationRating == null || priceRating == null || hygieneRating == null) {
            console.log("Some field is missing");
            return;
        }
    
        const overallRating = (serviceRating + transportationRating + priceRating + hygieneRating) / 4.0;
    
        const ratingItem: RatingItem = {
            serviceRating: serviceRating,
            transportRating: transportationRating,
            priceRating: priceRating,
            hygieneRating: hygieneRating,
            overallRating: overallRating,
            comment: comment,
            createdAt: '',
            user: '',
            _id: shopID,
            massageShop: {
                _id: '',
                id: ''
            }
        };
        
        // store.dispatch(updateRatingReducer(ratingItem))
        const response = await addRating(shopID, ratingItem);
    
        if (response.success) {
            dispatch(deleteReservationReducer(reservationID))
            alert("Thank you for your feedback!");
            window.location.reload();
        } else {
            alert("Failed to submit rating. Please try again.");
        }
        
        setLoading(false); 
    };

    return (
        <div className='flex flex-col gap-3 mt-'>
            <h1 className="font-semibold">Rate your experience</h1>
            <div className='flex justify-between mt-2'>
                <h1>Service</h1>
                <Rating value={serviceRating} onChange={(event, newValue) => handleServiceRatingChange(newValue)}></Rating>
            </div>
            <div className='flex justify-between mt-2'>
                <h1>Transportation</h1>
                <Rating value={transportationRating} onChange={(event, newValue) => handleTransportationRatingChange(newValue)}></Rating>
            </div>
            <div className='flex justify-between mt-2'>
                <h1>Price</h1>
                <Rating value={priceRating} onChange={(event, newValue) => handlePriceRatingChange(newValue)}></Rating>
            </div>
            <div className='flex justify-between mt-2'>
                <h1>Hygiene</h1>
                <Rating value={hygieneRating} onChange={(event, newValue) => handleHygieneRatingChange(newValue)}></Rating>
            </div>
            <div className='flex flex-col text-start my-4'>
                <h1>Comment</h1>
                <textarea placeholder='comment' className="resize-none border rounded-md " rows={12} value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div className='flex justify-center'>
                <button type='submit' className='text-white rounded-md w-1/3 bg-green-500 hover:bg-green-800' onClick={handleSubmit} disabled={loading}>Submit</button>
            </div>
        </div>
    );
};

export default RatingModal;
