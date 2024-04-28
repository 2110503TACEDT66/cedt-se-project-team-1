'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function deleteCoupon(cid: string) {
    const session = await getServerSession(authOptions);
    // console.log(mid);
    const response = await fetch(`${process.env.BACKEND_URL}/api/coupons/${cid}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${session?.user.token}`
        }
    });
    console.log(response.status)
    if (!response.ok) {
        throw new Error("Failed to fetch Coupon")
    }

    return await response.json();
}