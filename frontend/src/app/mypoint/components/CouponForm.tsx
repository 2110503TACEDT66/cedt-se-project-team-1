"use client";
import { useState, useEffect } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";

import { CouponItem, CouponItemRedux, MassageItem } from "../../../../interface";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { setMassageReducer } from "@/redux/features/massageSlice";

import getMassages from "@/libs/Massage/getMassages";
import { updateCouponReducer, addCouponReducer } from "@/redux/features/couponSlice";
import { useSession } from "next-auth/react";

import { useModal } from "@/components/ModalButton";

export default function CouponForm({
    isUpdate,
    cid,
    mid,
}: {
    isUpdate: boolean;
    cid: string | null;
    mid: string | null;
}) {
    const { data: session } = useSession();
    const { closeModal } = useModal();

    const [discount, setDiscount] = useState<number>(0);
    const [coverage, setCoverage] = useState<number>(0);
    const [point, setPoint] = useState<number>(0);
    const [expireAt, setExpireAt] = useState<Dayjs | null>(null);
    type UserType = "user" | "member";
    const [usableUserType, setUsableUserType] = useState<UserType>("user");
    const [selectedShop, setSelectedShop] = useState<string>(mid ?? "");

    const couponItems = useAppSelector(
        (state) => state.couponSlice.couponItems
    );

    const massageItems = useAppSelector(state => state.massageSlice.massageItems);

    useEffect(() => {
        getMassages().then((res) => {
            store.dispatch(setMassageReducer(res.data))
        })
    }, [])

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
                setUsableUserType(couponTarget.usableUserType as UserType);
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
            expireAt === null
        ) {
            console.log("Validation error")
            return;
        }

        try {
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
            closeModal();
        } catch (error) {
            console.log("Incomplete couponForm submit", error);
        }
    };

    return (
        <div className="flex flex-col items-center bg-white h-fit py-8 px-4 gap-4 rounded-xl">
            <InputLabel id="massage-shop-label">Massage Shop</InputLabel>
            <Select
                labelId="massage-shop-label"
                id="massage-shop"
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="w-[1/4] min-w-[200px]"
                disabled={(mid !== undefined) ? true : false}
            >
                {
                    massageItems.map((massageItem) => (
                        <MenuItem key={massageItem.id} value={massageItem.id}>{massageItem.name}</MenuItem>
                    ))
                }

            </Select>
            <div className="flex w-full justify-center gap-6 my-2">
                <TextField
                    id="discount"
                    label="Discount"
                    type="number"
                    value={discount}
                    variant="standard"
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-[1/4] overflow-auto"
                />
                <TextField
                    id="coverage"
                    label="Coverage"
                    type="number"
                    value={coverage}
                    variant="standard"
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-[1/4]"
                />
            </div>
            <div className="w-full flex justify-center">
                <DateReserve
                    onDateChange={(value: Dayjs) => {
                        setExpireAt(value);
                    }}
                    defaultDate={expireAt}
                />
            </div>
            <div className="flex w-full justify-center gap-4 my-2">
                <TextField
                    id="point"
                    label="Point"
                    type="number"
                    value={point}
                    variant="standard"
                    onChange={(e) => setPoint(Number(e.target.value))}
                    className="w-[1/4]"
                />
                <div className="w-[1/4] relative flex items-center flex-1">
                    <label htmlFor="usableUserType">usableUserType: </label>
                    <select
                        name="usableUserType"
                        id="usableUserType"
                        value={usableUserType}
                        onChange={(e) => { setUsableUserType(e.target.value as UserType) }}
                        className="ml-2 border-2 border-gray-300 rounded-md p-1 w-[1/2]"
                    >
                        <option value="user">User</option>
                        <option value="member">Member</option>
                    </select>
                </div>

            </div>

            <button
                className="px-4 py-2 bg-[#426B1F] text-[#FFFFFF] rounded-xl transition hover:bg-[#DBE7C9] hover:text-[#426B1F] mt-2"
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
