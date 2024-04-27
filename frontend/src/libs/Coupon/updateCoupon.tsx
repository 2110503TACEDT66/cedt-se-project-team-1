"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CouponItem } from "../../../interface";

export default async function updateCoupon(id: string, couponData: CouponItem) {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/coupons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${session?.user.token}`
            },
            body: JSON.stringify({
                massageShop: couponData.massageShop,
                point: couponData.point,
                discount: couponData.discount,
                coverage: couponData.coverage,
                expireAt: couponData.expireAt,
            })
        }
    );
    if (!response.ok) {
        throw new Error("Failed to edit coupon")
    }
    
    return await response.json();
}
