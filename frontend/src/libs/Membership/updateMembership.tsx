"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MembershipItem } from "../../../interface";

async function updateMembership(
  membershipId: string,
  membershipData: MembershipItem
) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/memberships/${membershipId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify(membershipData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update membership");
  }

  return await response.json();
}

export default updateMembership;
