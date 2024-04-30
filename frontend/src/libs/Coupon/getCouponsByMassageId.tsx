"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getCouponsByMassageId(mid :  string) {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/massages/${mid}/coupons`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.user.token}`
        }
    }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch coupons by massage id");
    }

    return await response.json();
}
