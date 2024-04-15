"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RatingUpdateData } from "../../interface";

export default async function updateRating(id:string, ratingData: RatingUpdateData) {

    const session = await getServerSession(authOptions);

    const { serviceRating, transportRating, priceRating, hygieneRating, comment } = ratingData;
    const overallRating = (serviceRating + transportRating + priceRating + hygieneRating) / 4.00;

    const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            serviceRating,
            transportRating,
            priceRating,
            hygieneRating,
            overallRating,
            comment
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update reservations")
    }

    return await response.json();
}