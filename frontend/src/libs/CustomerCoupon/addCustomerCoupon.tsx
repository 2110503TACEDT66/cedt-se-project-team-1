"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function addCustomerCoupon(couponId:string, customerId:string, massageId:string) {
    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.BACKEND_URL}/api/customerCoupons`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${session?.user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            coupon: couponId,
            user: customerId,
            massage: massageId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to add customer coupon")
    }

    return await response.json();
}
