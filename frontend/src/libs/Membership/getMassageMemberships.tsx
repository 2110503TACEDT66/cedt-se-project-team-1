"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

async function getMassageMemberships(massageId: string) {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/massages/${massageId}/memberships`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.user.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch massage memberships");
  }

  return await response.json();
}

export default getMassageMemberships;
