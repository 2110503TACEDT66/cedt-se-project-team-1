"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function deleteMassage(id: string) {

    const session = await getServerSession(authOptions)

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massages/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${session?.user.token}`,
        }
    });

    if (!response.ok) {
        throw new Error("Failed to delete massage")
    }

    return await response.json();
}