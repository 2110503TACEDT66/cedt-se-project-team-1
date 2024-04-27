"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function addMembership(massageId: string) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/massages/${massageId}/memberships`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add membership");
  }

  return await response.json();
}

export default addMembership;
