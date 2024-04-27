"use client"
import DateReserve from "@/components/DateReserve"
import { Select, MenuItem } from "@mui/material";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addReservationReducer, updateReservationReducer } from "@/redux/features/reservationSlice";

import dayjs, { Dayjs } from "dayjs";
import { CouponItem, CouponItemOne, CustomerCouponItem, CustomerCouponJson, MassageItem, MassageOne, ReservationItem } from "../../../../interface";
import getCustomerCouponByMassage from "@/libs/CustomerCoupon/getCustomerCouponByMassage";
import getMassage from "@/libs/Massage/getMassage";
import getCouponById from "@/libs/Coupon/getCouponById";
import deleteCoupon from "@/libs/Coupon/deleteCoupon";
import deleteCustomerCoupon from "@/libs/CustomerCoupon/deleteCustomerCoupon";

export default function ReservationForm({ isUpdate, id }: { isUpdate: boolean, id: string | null }) {

    const { data: session } = useSession();
    if (!session || !session.user.token) return null

    const massageItems = useAppSelector(state => state.massageSlice.massageItems)
    const reservationItems = useAppSelector(state => state.reservationSlice.reservationItems)
    const dispatch = useDispatch<AppDispatch>()

    const [ massage, setMassage] = useState<string>("")
    const [datePicker, setDatePicker] = useState<Dayjs | null>(null)
    const [resertionID, setReservationID] = useState<string>("")
    const [couponItems, setCouponItems] = useState< CustomerCouponJson|null>(null);
    
    const [coupon,setCoupon] = useState< string | null>(""); 
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number|null>(0);

    const [total, setTotal] = useState<number | null>(0);
    const [maxDiscount, setMaxDiscount] = useState<number | null>(0);
    const [customerCoupon, setCustomerCoupon] = useState<string|null>("");

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

    //coupon
    useEffect(() => {
        const fetchData = async () => {
          if (massage !== "" && massage !== null) {
            setCouponItems(null);
            try {
              const coupon: CustomerCouponJson = await getCustomerCouponByMassage(massage);
              setCouponItems(coupon);

              
            } catch (error) {
              console.error("Error fetching coupon:", error);

            }
          }else{

          }
        };
      
        fetchData();
        setCoupon(null);
      }, [massage]);

      //price
      useEffect(() => {
        const fetchData = async () => {
          if (massage !== "" && massage !== null) {
           setPrice(0);
            try {
                const massageShop :MassageOne = await getMassage(massage);
                console.log(massageShop.data.price);
                setPrice(massageShop.data.price);
                setDiscount(0);
              
            } catch (error) {
              console.error("Error fetching coupon:", error);

            }
          }else{
        

        
          }
        };
      
        fetchData();

      }, [massage]);

      //discount 
      useEffect(() => {
        const fetchData = async () => {
          if (coupon !== "" && coupon !== null ) {
            setDiscount(null);
            try {
                const usingTicket : CouponItemOne = await getCouponById(coupon);
                setMaxDiscount(usingTicket.data.coverage);
                console.log(usingTicket.data.discount);
                setDiscount(Math.min(usingTicket.data.discount/100.0 * price, usingTicket.data.coverage));
               
              
            } catch (error) {
              console.error("Error fetching coupon:", error);

            }
          }
        };
      
        fetchData();
      }, [coupon]);
      
      //total
      useEffect(() => {
        const fetchData = async () => {
            if(discount != null && price != null && maxDiscount != null ){
                const finalTotal = price - discount;
                setTotal(finalTotal);
            }

        };
      
        fetchData();
      }, [discount,price,maxDiscount]);

      


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
            price: total || 0,
            id: resertionID,
            _id: resertionID,
            __v: 0
        }

        if (isUpdate) {
            if (id === null) return console.log("id is null while editing reservation");
            dispatch(updateReservationReducer(data))
        } else {
            dispatch(addReservationReducer(data));
            const selectedCouponItemId = coupon;
            const selectedCouponItem = couponItems?.data.find(
                (item) => item.coupon._id === coupon
              );
              
              if (selectedCouponItem) {
                console.log("Selected coupon item details:", selectedCouponItem);
                deleteCoupon(selectedCouponItem.coupon._id);
                deleteCustomerCoupon(selectedCouponItem._id);
              }
    
        
        }

    }

    return (
        <>
            <div className="h-[calc(100vh-75px)] grid justify-center items-center w-[400px]">
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
                
                    <Select
                    variant="standard"
                    name="coupon"
                    id="coupon"
                    className="w-full"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                >
                    {couponItems === null ? (
                        <MenuItem disabled>No coupons for this shop...</MenuItem>
                    ) : couponItems?.data?.map((couponItem: CustomerCouponItem) => (
                        <MenuItem key={couponItem._id} value={couponItem.coupon._id}>
                            Discount {couponItem.coupon.discount}% Maximum {couponItem.coupon.coverage}฿
                        </MenuItem>
                    ))}
                </Select>


                    <div className="w-full px-2 py-4 ">
                        <div className="flex justify-between">
                            <h2>Price</h2>
                            <h2>{price} ฿</h2>
                        </div>

                        <div className="flex justify-between text-rose-500">
                            <h2>Discount</h2>
                            <h2>-{discount} ฿</h2>
                        </div>
                        <div className="flex justify-between text-green-500">
                            <h2>Total</h2>
                            <h2>{total} ฿</h2>
                        </div>
                        
                    </div>
                    
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