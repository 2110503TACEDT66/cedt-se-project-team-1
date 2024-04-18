'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getRatings() {
    try {
        const session = await getServerSession(authOptions);
        const response = await fetch(`${process.env.BACKEND_URL}/api/ratings`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${session?.user.token}`
          }
        })

        if(!response.ok) {
            throw new Error("Failed to fetch all ratings");
        }

        const data = await response.json();
        
        return data;
        
    } catch (error) {
        console.log('Error fetching the ratings ' + error);
        return null
    }
}