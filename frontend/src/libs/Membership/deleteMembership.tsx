"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function deleteMembership(membershipId: string) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/memberships/${membershipId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session?.user.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete membership");
  }

  return await response.json();
}

export default deleteMembership;
