"use server";
import { MassageItem } from "../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getMassages() {
    // Optional loading delay simulation (uncomment if needed)
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const session = await getServerSession(authOptions);
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/massages`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch massages");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching massages:", error);
        // Handle the error gracefully (e.g., display an error message to the user)
        return null; // Or throw a specific error for further handling
    }
}
