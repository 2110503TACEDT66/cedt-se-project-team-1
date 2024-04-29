"use client";
import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import dayjs, {Dayjs} from "dayjs";

import { CouponItem, CouponItemRedux, MassageItem } from "../../../../interface";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

import getMassages from "@/libs/Massage/getMassages";
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
    const [selectedShop, setSelectedShop] = useState<string>(mid ?? "");
    
    const couponItems = useAppSelector(
        (state) => state.couponSlice.couponItems
    );
    const massageItems = useAppSelector(state => state.massageSlice.massageItems)

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
                setSelectedShop(couponTarget.massageShop);
            }
        }
    }, []);

    const onSubmit = async () => {
        const data: CouponItemRedux = {
            discount,
            coverage,
            point,
            expireAt: expireAt?.format() ?? "", // Convert Dayjs to string or use an empty string if null
            usableUserType,
            massageShop: selectedShop,
            _id: cid ?? "",
            __v: 0,
            isMassageShop: (mid !== undefined)
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
            dispatch(addCouponReducer(data));
        }
    };

    return (
        <div className="flex flex-col items-center bg-white h-[500px] py-8 px-4 gap-4 rounded-xl">
                <InputLabel id="massage-shop-label">Massage Shop</InputLabel>
                <Select
                    labelId="massage-shop-label"
                    id="massage-shop"
                    value={selectedShop}
                    onChange={(e) => setSelectedShop(e.target.value)}
                    className="w-[1/4]"
                    disabled={(mid !== undefined) ? true : false}
                >
                    {
                        massageItems.map((massageItem) => (
                            <MenuItem key={massageItem.id} value={massageItem.id}>{massageItem.name}</MenuItem>
                        ))
                    }

                </Select>
                <div className="flex w-full justify-center gap-6">
                    <TextField
                        id="discount"
                        label="Discount"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="w-[1/4]"
                    />
                    <TextField
                        id="coverage"
                        label="Coverage"
                        type="number"
                        value={coverage}
                        onChange={(e) => setCoverage(Number(e.target.value))}
                        className="w-[1/4]"
                    />
                </div>
                <div className="w-[500px] flex justify-center">
                    <DateReserve
                        onDateChange={(value: Dayjs) => {
                            setExpireAt(value);
                        }}
                        defaultDate={expireAt}
                    />
                </div>
                <div className="flex w-full justify-center gap-4">
                    <TextField
                        id="point"
                        label="Point"
                        type="number"
                        value={point}
                        onChange={(e) => setPoint(Number(e.target.value))}
                        className="w-[1/4]"
                    />
                    <TextField
                        id="usableUserType"
                        label="Usable User Type"
                        type="text"
                        value={usableUserType}
                        onChange={(e) => setUsableUserType(e.target.value)}
                        className="w-[1/4]"
                    />
                </div>

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
