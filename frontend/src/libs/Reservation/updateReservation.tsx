"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReservationItem } from "../../../interface";

export default async function updateReservation(id:string, reservationData: ReservationItem) {

    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.BACKEND_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            apptDate: reservationData.apptDate,
            user: reservationData.user,
            massage: reservationData.massage
        })
    });

    if (!response.ok) {
        throw new Error("Failed to update reservations")
    }

    return await response.json();
}