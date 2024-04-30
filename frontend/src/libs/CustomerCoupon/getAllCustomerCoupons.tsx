"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getAllCustomerCoupons() {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/customerCoupons`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.user.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch massage rating")
    }

    return await response.json();
}