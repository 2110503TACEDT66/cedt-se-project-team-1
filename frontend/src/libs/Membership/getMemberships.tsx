"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function getMemberships() {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.BACKEND_URL}/api/memberships`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.user.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch memberships");
  }

  return await response.json();
}

export default getMemberships;
