"use client";
import addMembership from "@/libs/Membership/addMembership";
import getMemberships from "@/libs/Membership/getMemberships";
import { useAppSelector } from "@/redux/store";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MembershipItem } from "../../../../../../interface";
import updateMembership from "@/libs/Membership/updateMembership";

function page({ params }: { params: { mid: string } }) {

  const massageItem = useAppSelector(state => state.massageSlice.massageItems);
  const massage = massageItem.find(massage => massage.id === params.mid)

  const { data: session } = useSession();
  if (!session || !session.user.token) return null;

  const router = useRouter();

  const [isMember, setIsMember] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<MembershipItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user.token) return;
      try {
        const response = await getMemberships();
        const data: MembershipItem[] = response.data;

        data.filter((membership) => {
          return membership.massageShop === params.mid && membership.user === session.user.data._id;
        })
        setIsMember(data.length > 0);
        if (isMember) {
          setMemberData(data[0]);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);


  const handleJoin = async () => {
    if (!session || !session.user.token) {
      router.push("/auth/signin");
      return;
    }
    if (!memberData) return;
    try {
      if (isMember) {
        const oldExpireAt = new Date(memberData.expireAt);
        const next30Days = new Date(oldExpireAt.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expireAt = next30Days.toISOString();

        const item: MembershipItem = {
          _id: memberData._id,
          user: memberData.user,
          massageShop: memberData.massageShop,
          startAt: memberData.startAt,
          expireAt
        }
        const response = await updateMembership(params.mid, item);
        alert("Continue Membership Successfully")
      }
      else {
        const response = await addMembership(params.mid);
        alert("Join Membership Successfully")
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {
        massage !== undefined ? (
          <div className="bg-[#f6edd8e0] mx-6 mb-8 mt-10 rounded-lg">


            <main className="p-5 items-center">
              <div className="flex flex-col my-5 items-center gap-8">
                <div className="relative">

                </div>
                <div className="flex flex-col ml-5">
                  <h1 className="text-2xl font-bold mb-4">
                    {isMember ? `Welcome back, You are one of ${massage.name} Membership` : `Join ${massage.name} Membership`}

                  </h1>
                  <Button onClick={() => { handleJoin() }}>{isMember ? "Join" : "Continue Membership"}</Button>
                </div>

              </div>
            </main>
          </div>
        ) : <h1>This massage id not availble </h1>
      }
    </>
  )
}

export default page;
