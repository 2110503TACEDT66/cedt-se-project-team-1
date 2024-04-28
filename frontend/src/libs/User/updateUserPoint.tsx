"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function updateUserPoint(uid:string ,point: number) {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.BACKEND_URL}/api/points/${uid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({ point })
    })
    if(!response.ok){
        throw new Error("Failed to update user point")
    }
    return await response.json();
}
