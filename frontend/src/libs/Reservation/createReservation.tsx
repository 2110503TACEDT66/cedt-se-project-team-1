"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReservationItem } from "../../../interface";
import { getServerSession } from "next-auth";

export default async function createReservation(reservationData: ReservationItem) {

    const session = await getServerSession(authOptions);

    const res = await fetch(`${process.env.BACKEND_URL}/api/massages/${reservationData.massage.id}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            apptDate: reservationData.apptDate,
            user: reservationData.user,
        })
    });

    if (!res.ok) {
        throw new Error('Failed to create reservation');
    }

    return await res.json();
}