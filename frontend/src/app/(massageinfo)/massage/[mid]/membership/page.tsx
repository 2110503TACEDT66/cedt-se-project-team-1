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
        const membershipItem: MembershipItem[] = response.data;

        const filteredMemberships = await membershipItem.filter((membership) => {
          return membership.massageShop === params.mid && membership.user === session.user.data._id;
        })
        setIsMember(filteredMemberships.length > 0);
        if (filteredMemberships.length > 0) {
          setMemberData(filteredMemberships[0]);
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
    
    try {
      if (isMember) {
        console.log(memberData);
        if (!memberData) return;
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
        const response = await updateMembership(memberData._id, item);
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
          <div>
            <div className="text-4xl font-bold mt-20 flex flex-col items-center">
              {isMember ? `Welcome back, You are one of ${massage.name} Membership` : `Join ${massage.name} Membership`}
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-[#f6edd8e0] mx-8 mb-8 mt-20 rounded-3xl w-96 h-60 shadow-xl">
                      <div className="text-center my-24">
                        <Button className= "max-w-44 w-44 items-center" variant="contained" color="success" onClick={() => { handleJoin() }}>{isMember ? "Continue Member" : "  Join"}</Button>
                      </div>
              </div>
            </div>

          </div>
        ) : <h1>This massage id not availble </h1>
      }
    </>
  )
}

export default page;
