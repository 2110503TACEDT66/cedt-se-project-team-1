"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CouponItem } from "../../../interface";

export default async function createCoupon(couponData: CouponItem) {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/massages/${couponData.massageShop}/coupons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${session?.user.token}`
            },
            body: JSON.stringify({
                point: couponData.point,
                discount: couponData.discount,
                coverage: couponData.coverage,
                expireAt: couponData.expireAt,
                usableUserType: couponData.usableUserType
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create coupon")
    }
    
    return await response.json();
}
