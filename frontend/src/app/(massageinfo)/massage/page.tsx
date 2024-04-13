"use client"
import getMassages from "@/libs/Massage/getMassages";
import MassageCatalog from "@/components/MassageCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ModalButton from "@/components/ModalButton";
import MassageForm from "@/components/MassageForm";
import TextHeader from "@/components/TextHeader";

import { useAppSelector } from "@/redux/store";
import { store } from "@/redux/store";
import { setMassageReducer } from "@/redux/features/massageSlice";

export default function Massage() {

    useEffect(() => {
        getMassages().then((res) => {
            store.dispatch(setMassageReducer(res.data))
        })
    }, [])
    
    const { data: session } = useSession()
    const massageItems = useAppSelector(state => state.massageSlice.massageItems)    

    return (
        <main className="p-5">

            <div className="flex flex-col justify-center items-center mt-20">
                 <TextHeader>
                <h1>Select Your Massage</h1>
            </TextHeader>
            </div>

            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                {massageItems && <MassageCatalog massages={massageItems} />}
            </Suspense>            
            {
                session?.user.data.role === "shopOwner"
                ? (
                    <div className="flex flex-col justify-center items-center mt-20">
                       <ModalButton text="Create new massage" color="green">
                        {<MassageForm isUpdate={false} id={null}/>}
                        </ModalButton> 
                    </div>
                    
                )
                : null
            }
        </main>
    )
}