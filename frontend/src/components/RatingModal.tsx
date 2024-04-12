import React, { useState } from 'react';
import { Rating } from '@mui/material';
import addRating from '@/libs/addRating';
import { RatingItem } from '../../interface';
import deleteReservation from '@/libs/deleteReservation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteReservationReducer } from '@/redux/features/reservationSlice';

const RatingModal = ({ shopID, reservationID }: { shopID: string, reservationID: string }) => {
    // State variables to store rating values for different categories
    const [serviceRating, setServiceRating] = useState<number | null>(null);
    const [transportationRating, setTransportationRating] = useState<number | null>(null);
    const [priceRating, setPriceRating] = useState<number | null>(null);
    const [hygieneRating, setHygieneRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()
    
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
        console.log('Service Rating:', serviceRating);
        console.log('Transportation Rating:', transportationRating);
        console.log('Price Rating:', priceRating);
        console.log('Hygiene Rating:', hygieneRating);
        console.log('Comment:', comment);
    
        if (serviceRating == null || transportationRating == null || priceRating == null || hygieneRating == null) {
            console.log("Some field is missing");
            return;
        }
    
        const overallRating = (serviceRating + transportationRating + priceRating + hygieneRating) / 4.0;
        console.log('Overall Rating:', overallRating);
    
        const ratingItem: RatingItem = {
            serviceRating: serviceRating,
            transportRating: transportationRating,
            priceRating: priceRating,
            hygieneRating: hygieneRating,
            overallRating: overallRating,
            comment: comment,
        };
    
        console.log('Rating Item:', ratingItem);
    
        const response = await addRating(shopID, ratingItem);
        console.log('Response:', response);
    
        if (response.success) {
            // deleteReservation(reservationID);
            dispatch(deleteReservationReducer(reservationID))
            alert("THank you for your feedback!");
            window.location.reload();
        }
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
                <textarea className="resize-none border rounded-md " rows={12} value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <div className='flex justify-center'>
                <button type='submit' className='text-white rounded-md w-1/3 bg-green-500 hover:bg-green-800' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default RatingModal;
