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
          <div className="bg-[#f6edd8e0] h-[83vh] mx-6 mb-8 mt-8 rounded-lg">

            <main className="p-5 items-center h-full overflow-y-hidden">
              <div className="flex flex-col my-5 items-center gap-8 h-full">
                <div className="flex flex-col ml-5 h-full">
                  <h1 className="text-2xl font-bold mb-4 text-center">
                    {isMember ? `Welcome back, You are one of ${massage.name} Membership` : `Join ${massage.name} Membership`}

                  </h1>
                  <div className="flex bg-white rounded-md p-2 shadow-md py-4 h-[80%]">
                    <div className="w-full border-r pr-3">
                      <h2 className="text-lg mb-2 font-semibold text-center text-gray-800">None-Subscription</h2>
                      <h2 className="text-lg font-semibold text-center text-white bg-[#99a881] my-4 py-2 mb-6 rounded-sm">FREE</h2>
                      <ul className=" list-disc text-md ml-5 space-y-2 ">
                        <li className="text-gray-700 bullet">Access to common coupons</li>
                        <li className="text-red-500 bullet">No exclusive offers</li>
                        <li className="text-red-500 bullet">Limited support</li>
                      </ul>
                    </div>
                    <div className="w-full pl-3 flex flex-col items-center">
                      <h2 className="text-lg mb-2 font-semibold text-center text-gray-800">Subscription</h2>  
                      <h2 className="text-lg font-semibold text-center text-white bg-[#99a881] my-2 py-2 mb-6 w-full rounded-sm">9.99$/mo</h2>
                      <ul className="text-md mb-2 list-disc ml-5 space-y-2">
                        <li className="text-gray-700 bullet">Access to common coupons</li>
                        <li className="text-green-500 bullet">Access to premium coupons</li>
                        <li className="text-green-500 bullet">Exclusive offers and discounts</li>
                        <li className="text-green-500 bullet">Priority support</li>
                      </ul>
                      <div className="w-2/3 flex justify-center rounded-md bg-blue-200 mt-28 hover:shadow-gray-600">
                        <Button id="JoinBtn" onClick={() => { handleJoin() }}>{isMember ? "Continue Membership" : "Join"}</Button>
                        </div>

                  </div>
                  </div>


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
