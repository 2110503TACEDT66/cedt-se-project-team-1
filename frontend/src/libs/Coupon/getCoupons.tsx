"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getCoupons() {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/coupons`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.user.token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch massages");
    }

    return await response.json();
}
