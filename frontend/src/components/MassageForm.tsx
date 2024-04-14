"use client"
import { useState, useEffect } from "react"
import { TextField } from "@mui/material"
import { MassageItem } from "../../interface"

import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { updateMassageReducer, addMassageReducer } from "@/redux/features/massageSlice"
import { useSession } from "next-auth/react"

export default function MassageForm({isUpdate, id}: {isUpdate: boolean, id: string | null}) {

    const { data: session } = useSession();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [district, setDistrict] = useState("")
    const [province, setProvince] = useState("")
    const [postalcode, setPostalcode] = useState("")
    const [tel, setTel] = useState("")
    const [picture, setPicture] = useState("no-photo")

    const massageItems = useAppSelector(state => state.massageSlice.massageItems)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (isUpdate) {
            if (id === null) return ;
            const massageTarget = massageItems.find((massage) => massage.id === id)
            if (massageTarget) {
                setName(massageTarget.name || "")
                setDescription(massageTarget.description || "")
                setAddress(massageTarget.address || "")
                setDistrict(massageTarget.district || "")
                setProvince(massageTarget.province || "")
                setPostalcode(massageTarget.postalcode || "")
                setTel(massageTarget.tel || "")
                setPicture(massageTarget.picture)
            }
        }
    }, [])

    const onSubmit = async () => {
        const data:MassageItem = {
            name: name,
            description: description,
            address: address,
            district: district,
            province: province,
            postalcode: postalcode,
            tel: tel,
            picture: picture,
            _id: (id === null) ? "" : id,
            __v: 0,
            id: (id === null) ? "" : id,
            reservation: [],
            owner: session?.user.data._id || "",
            rating: 0,
            hygieneRating: 0,
            overallRating: 0,
            priceRating: 0,
            serviceRating: 0,
            transportRating: 0
        }

        // validate date
        if (!name || !description || !address || !district || !province || !postalcode || !tel || !picture) return

        if (name.length > 50) return alert("name is too long")
        if (description.length > 500) return alert("description is too long")
        if (postalcode.length > 5) return alert("postalcode is too long")

        // update data
        if (isUpdate) {
            // update data
            if (id === null) return console.log("id is null while editing massage");
            dispatch(updateMassageReducer(data))
        } else {
            // create data   
            dispatch(addMassageReducer(data))
        }
    }

    return (
        <div className="flex flex-col items-center bg-white w-[500px] py-8 px-4 gap-4 rounded-xl">
            <TextField id="name" label="name" variant="standard" type="text" value={name} onChange={(e) => (setName(e.target.value))} />
            <TextField id="description" label="description" variant="standard" type="text" value={description} onChange={(e) => (setDescription(e.target.value))} />
            <TextField id="address" label="address" variant="standard" type="text" value={address} onChange={(e) => (setAddress(e.target.value))} />
            <TextField id="district" label="district" variant="standard" type="text" value={district} onChange={(e) => (setDistrict(e.target.value))} />
            <TextField id="province" label="province" variant="standard" type="text" value={province} onChange={(e) => (setProvince(e.target.value))} />
            <TextField id="postalcode" label="postalcode" variant="standard" type="text" value={postalcode} onChange={(e) => (setPostalcode(e.target.value))} />
            <TextField id="tel" label="tel" variant="standard" type="text" value={tel} onChange={(e) => (setTel(e.target.value))} />
            <TextField id="picture" label="picture" variant="standard" type="text" value={picture} onChange={(e) => (setPicture(e.target.value))} />

            <button className="px-4 py-2 bg-[#426B1F] text-[#FFFFFF] rounded-xl transition hover:bg-[#DBE7C9] hover:text-[#426B1F]" onClick={(e) => { e.stopPropagation(); onSubmit(); }}>{isUpdate ? "Update" : "Create"}</button>
        </div>
    )

}