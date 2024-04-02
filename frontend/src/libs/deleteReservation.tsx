"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function deleteReservation(id:string) {

    const session = await getServerSession(authOptions);
    console.log(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`)

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete reservations")
    }

    return await response.json();
}