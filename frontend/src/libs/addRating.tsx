"use server"
import React from 'react'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { RatingItem } from '../../interface';
const addRating = async (shopID:string,ratingItem:RatingItem) => {
    const session = await getServerSession(authOptions);
    console.log(ratingItem);
    const res = await fetch(`${process.env.BACKEND_URL}/api/massages/${shopID}/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({

            serviceRating: ratingItem.serviceRating,
            transportRating: ratingItem.transportRating,
            priceRating: ratingItem.priceRating,
            hygieneRating: ratingItem.hygieneRating,
            overallRating: ratingItem.overallRating,
            comment: ratingItem.comment,
        })
    });

    if (!res.ok) {
        throw new Error('Failed to create a feedback');
    }

    return await res.json();
}

export default addRating
