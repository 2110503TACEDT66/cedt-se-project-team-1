"use server"
import { getServerSession } from "next-auth";
import { MassageItem } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function editMassage(id: string, massageData: MassageItem) {

    const session = await getServerSession(authOptions);

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massages/${id}`, {
        method: 'PUT',
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
            description: massageData.description
        })
    });

    if (!response.ok) {
        throw new Error("Failed to edit massage")
    }

    return await response.json();
}