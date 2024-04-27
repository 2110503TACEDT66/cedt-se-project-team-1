"use client"
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({ onDateChange, defaultDate }: { onDateChange: Function, defaultDate: Dayjs | null}) {
    // console.log("defaultDate = ", defaultDate);
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(defaultDate);

    return (
            <div className="w-full h-full">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker className="bg-white w-full" 
                value= {reserveDate}
                onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
             </LocalizationProvider>
            </div>

       
    )
}

