"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RatingItem, ReservationItem } from "../../interface";

export default async function updateReservation(id:string, ratingData: RatingItem) {

    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            rating: ratingData.rating,
            comment: ratingData.comment
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update reservations")
    }

    return await response.json();
}