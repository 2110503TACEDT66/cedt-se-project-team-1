"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getMassage(id: string) {
    const session = await getServerSession(authOptions);
    console.log(id);
    
    const response = await fetch(
        `${process.env.BACKEND_URL}/api/massages/${id}`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${session?.user.token}`,
            },
        }
    );
  
    if (!response.ok) {
        throw new Error("Failed to fetch massage");
    }
    
    return await response.json();
}
