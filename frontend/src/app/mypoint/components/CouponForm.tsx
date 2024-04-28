"use client";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import dayjs, {Dayjs} from "dayjs";

import { CouponItem, MassageItem } from "../../../../interface";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import { updateCouponReducer, addCouponReducer } from "@/redux/features/couponSlice";
import { useSession } from "next-auth/react";

export default function CouponForm({
    isUpdate,
    cid,
    mid
}: {
    isUpdate: boolean;
    cid: string | null;
    mid: string | null;
}) {
    const { data: session } = useSession();

    const [discount, setDiscount] = useState<number>(0);
    const [coverage, setCoverage] = useState<number>(0);
    const [point, setPoint] = useState<number>(0);
    const [expireAt, setExpireAt] = useState<Dayjs | null>(null);
    const [usableUserType, setUsableUserType] = useState<string>("");

    const couponItems = useAppSelector(
        (state) => state.couponSlice.couponItems
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isUpdate) {
            if (cid === null) return;
            const couponTarget = couponItems?.find(
                (coupon) => coupon._id === cid
            );
            if (couponTarget) {
                setDiscount(couponTarget.discount);
                setCoverage(couponTarget.coverage);
                setPoint(couponTarget.point);
                setExpireAt(dayjs(couponTarget.expireAt));
                setUsableUserType(couponTarget.usableUserType);
            }
        }
    }, []);

    const onSubmit = async () => {
        const data: CouponItem = {
            discount,
            coverage,
            point,
            expireAt: expireAt?.format() ?? "", // Convert Dayjs to string or use an empty string if null
            usableUserType,
            massageShop: mid ?? "",
            _id: cid ?? "",
            __v: 0
        };

        // validate date
        if (
            discount < 0 ||
            coverage < 0 ||
            point < 0 ||
            expireAt === null ||
            usableUserType === ""
        ) {
            console.log("Validation error")
            return;
        }
        
        // update data
        if (isUpdate) {
            // update data
            if (cid === null)
                return console.log("cid is null while editing massage");
            dispatch(updateCouponReducer(data));
        } else {
            // create data
            console.log("create data", data);
            dispatch(addCouponReducer(data));
        }
    };

    return (
        <div className="flex flex-col items-center bg-white w-[500px] py-8 px-4 gap-4 rounded-xl">
            <TextField
                id="discount"
                label="Discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
            />
            <TextField
                id="coverage"
                label="Coverage"
                type="number"
                value={coverage}
                onChange={(e) => setCoverage(Number(e.target.value))}
            />
            <TextField
                id="point"
                label="Point"
                type="number"
                value={point}
                onChange={(e) => setPoint(Number(e.target.value))}
            />

            <DateReserve onDateChange={(value: Dayjs) => {
                setExpireAt(value);
            }} defaultDate={expireAt} />
            
            <TextField
                id="usableUserType"
                label="Usable User Type"
                type="text"
                value={usableUserType}
                onChange={(e) => setUsableUserType(e.target.value)}
            />

            <button
                className="px-4 py-2 bg-[#426B1F] text-[#FFFFFF] rounded-xl transition hover:bg-[#DBE7C9] hover:text-[#426B1F]"
                onClick={(e) => {
                    e.stopPropagation();
                    onSubmit();
                }}
            >
                {isUpdate ? "Update" : "Create"}
            </button>
        </div>
    );
}
