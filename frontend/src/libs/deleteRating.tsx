"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function deleteRating(id:string) {

    const session = await getServerSession(authOptions);
    console.log(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`)

    const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete rating")
    }

    return await response.json();
}