'use client';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

async function RatingManagement() {
  const router = useRouter();
  const session = useSession()

  const

  //if not an admin
  if(session.data?.user.data.role !== 'admin') {
    router.push('/api/auth/signin')
  }

  return (
    <main className="p-2 flex flex-row justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Rating Management</h1>
      <section className="grid">

      </section>
    </main>
  );
}

export default RatingManagement;
