'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getCustomerCouponByMassage(mid: string) {
    const session = await getServerSession(authOptions);
    console.log(mid);
    const response = await fetch(`${process.env.BACKEND_URL}/api/customerCoupons/massage/${mid}/`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.user.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch customerCoupon")
    }

    return await response.json();
}