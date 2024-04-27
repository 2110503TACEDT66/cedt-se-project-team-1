"use client"
import DateReserve from "@/components/DateReserve"
import { Select, MenuItem } from "@mui/material";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addReservationReducer, updateReservationReducer } from "@/redux/features/reservationSlice";

import dayjs, { Dayjs } from "dayjs";
import { ReservationItem } from "../../../../interface";

export default function ReservationForm({ isUpdate, id }: { isUpdate: boolean, id: string | null }) {

    const { data: session } = useSession();
    if (!session || !session.user.token) return null

    const massageItems = useAppSelector(state => state.massageSlice.massageItems)
    const reservationItems = useAppSelector(state => state.reservationSlice.reservationItems)
    const dispatch = useDispatch<AppDispatch>()

    const [massage, setMassage] = useState<string>("")
    const [datePicker, setDatePicker] = useState<Dayjs | null>(null)
    const [resertionID, setReservationID] = useState<string>("")

    useEffect(() => {
        if (isUpdate) {
            if (id === null) return;
            const reservationTarget = reservationItems.find((reservation) => reservation.id === id)
            if (reservationTarget) {
                setMassage(reservationTarget.massage._id)
                setDatePicker(dayjs(reservationTarget.apptDate))
                setReservationID(reservationTarget._id)
            }
        }
    }, [])

    useEffect(() => {

    }, [massage]);

    const onSumbit = async () => {

        if (!massage || !datePicker) return

        const data: ReservationItem = {
            apptDate: dayjs(datePicker).format("YYYY-MM-DD"),
            user: session.user.data._id,
            massage: {
                _id: massage,
                name: "",
                province: "",
                tel: "",
                id: massage,
                picture: ""
            },
            id: resertionID,
            _id: resertionID,
            __v: 0
        }

        if (isUpdate) {
            if (id === null) return console.log("id is null while editing reservation");
            dispatch(updateReservationReducer(data))
        } else dispatch(addReservationReducer(data))

    }

    return (
        <>
            <div className="h-[calc(100vh-75px)] grid justify-center items-center w-[500px]">
                <div className="bg-[#FFFFFF] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96 gap-4">
                    <h1 className="text-2xl text-center mb-5">Massage Reservation</h1>
                    <Select variant="standard" name="hospital" id="hospital" className="h-[2em] w-full" value={massage} onChange={(event) => setMassage(event.target.value)}>
                        {
                            massageItems.map((massageItem) => (
                                <MenuItem key={massageItem.id} value={massageItem.id}>{massageItem.name}</MenuItem>
                            ))
                        }
                    </Select>
               
                    <DateReserve onDateChange={(value: Dayjs) => {
                        setDatePicker(value);
                    }} defaultDate={datePicker} />
                

                    <Select variant="standard" name="coupon" id="coupon" className="w-full" value={massage} onChange={(event) => setMassage(event.target.value)}>
                        {
                            massageItems.map((massageItem) => (
                                <MenuItem key={massageItem.id} value={massageItem.id}>{massageItem.name}</MenuItem>
                            ))
                        }
                    </Select>

                    <button name="Book Vaccine" className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5" 
                    onClick={() => { 
                        if (reservationItems.length >= 3) {
                            alert("You already have 3 reservations")
                            return ;
                        }
                        onSumbit();
                        }}>Reserve Massage</button>
                </div>
            </div>
        </>
    )

}