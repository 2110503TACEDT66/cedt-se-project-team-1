"use client"
import Image from "next/image"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import MassageRating from "@/app/(massageinfo)/components/MassageRating";
import getMassagesRating from "@/libs/Rating/getMassagesRating";
import { MassageItem, RatingJson, Role } from "../../../../../interface";

import { useDispatch } from "react-redux";
import { updateMassageReducer } from "@/redux/features/massageSlice";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MypointPage from "@/app/mypoint/page";
import ModalButton from "@/components/ModalButton";
import CouponForm from "@/app/mypoint/components/CouponForm";

export default function MassageDetailPage({ params }: { params: { mid: string } }) {

    const massageItem = useAppSelector(state => state.massageSlice.massageItems)
    const massage = massageItem.find(massage => massage.id === params.mid)
    const [ratingJson, setRatingJson] = useState<RatingJson>({ success: false, data: [] });
    const pathname = usePathname();

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession();
    if (massage !== undefined) {
        useEffect(() => {
            getMassagesRating(massage.id).then((res) => setRatingJson(res));
        }, [])

        useEffect(() => {
            let massageUpdated: MassageItem = massage;
            if (ratingJson.data.length === 0) {
                massageUpdated = {
                    ...massage,
                    overallRating: 0,
                    serviceRating: 0,
                    transportRating: 0,
                    priceRating: 0,
                    hygieneRating: 0
                }
            } else {
                const serviceRating = ratingJson.data.reduce((a, b) => a + b.serviceRating, 0) / ratingJson.data.length;
                const transportRating = ratingJson.data.reduce((a, b) => a + b.transportRating, 0) / ratingJson.data.length;
                const priceRating = ratingJson.data.reduce((a, b) => a + b.priceRating, 0) / ratingJson.data.length;
                const hygieneRating = ratingJson.data.reduce((a, b) => a + b.hygieneRating, 0) / ratingJson.data.length;
                const overallRating = (serviceRating + transportRating + priceRating + hygieneRating) / 4.0;

                massageUpdated = {
                    ...massage,
                    serviceRating: serviceRating,
                    transportRating: transportRating,
                    priceRating: priceRating,
                    hygieneRating: hygieneRating,
                    overallRating: overallRating
                }
            }
            console.log(massageUpdated)
            if (session?.user.data.role === 'admin') {
                dispatch(updateMassageReducer(massageUpdated))
            }



        }, [ratingJson])


    }

    return (
        <>
            {
                massage !== undefined ? (
                    <div className="bg-[#f6edd8e0] mx-6 mb-8 mt-10 rounded-lg">


                        <main className="p-5 items-center">
                            <div className="flex flex-col my-5 items-center gap-8">
                                <div className="relative">
                                    <Image src={massage.picture == "no-photo" ? "/img/massage-default.jpg" : massage.picture}
                                        alt="Product Picture"
                                        width={400} height={400} sizes="100vw"
                                        className="rounded-lg bg-black"
                                    />
                                </div>
                                <div className="flex flex-col ml-5">
                                    <h1 className="text-4xl font-bold mb-4">{massage.name}</h1>
                                    <p className="text-lg mb-2">{massage.description}</p>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        <div>
                                            <p className="text-gray-600">Address:</p>
                                            <p>{massage.address}</p>
                                            <p>{massage.district}</p>
                                            <p>{massage.province}</p>
                                            <p>{massage.postalcode}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Tel:</p>
                                            <p>{massage.tel}</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    session?.user.data.role !== Role.ShopOwner ?
                                        <Link href={pathname + "/membership"}
                                            className="p-3 px-5 text-lg bg-orange-300 rounded-lg font-medium shadow-lg hover:bg-amber-600 hover:text-white ease-i-out duration-300">
                                            Join Membership
                                        </Link>
                                    : null
                                }
                                <MassageRating ratingJson={ratingJson} />
                            </div>

                            {/* Coupon Massage Shop */}
                            <MypointPage mid={params.mid} />
                        </main>
                        
                    </div>
                ) : <h1>This massage id not availble </h1>
            }
        </>
    )
}