"use server"
import { MassageItem } from "../../../interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function createMassage(massageData: MassageItem) {

    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.BACKEND_URL}/api/massages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            name: massageData.name,
            address: massageData.address,
            district: massageData.district,
            province: massageData.province,
            postalcode: massageData.postalcode,
            tel: massageData.tel,
            picture: massageData.picture,
            description: massageData.description,
            // owner: session?.user.data._id
            owner: massageData.owner
        })
    });

    if (!response.ok) {
        throw new Error("Failed to create massage")
    }

    return await response.json();

}