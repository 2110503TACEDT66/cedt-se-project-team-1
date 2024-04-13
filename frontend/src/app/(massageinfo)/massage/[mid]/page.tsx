"use client"
import Image from "next/image"
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import MassageRating from "@/components/MassageRating";
import getMassagesRating from "@/libs/Rating/getMassagesRating";
import { RatingJson } from "../../../../../interface";

export default function MassageDetailPage({ params }: { params: { mid: string } }) {

    const massageItem = useAppSelector(state => state.massageSlice.massageItems)
    const massage = massageItem.find(massage => massage.id === params.mid)
    const [ratingJson, setRatingJson] = useState<RatingJson>({ success: false, data: [] });
    
    if (massage !== undefined) {
        useEffect(() => {
            getMassagesRating(massage.id).then((res) => setRatingJson(res))
        }, [])
    }

    return (
        <>
        {
            massage !== undefined ? (
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
                        <MassageRating ratingJson={ratingJson}/>
                    </div>
                </main>
            ) : <h1>This massage id not availble </h1>
        }
        </>
    )
}