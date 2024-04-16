"use client"
import { TextField } from "@mui/material"
import userRegister from "@/libs/Authenticate/userRegister"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Role } from "../../../../interface"
import Link from "next/link"

export default function Page() {

    const router = useRouter()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")

    const onSubmit = async () => {
        if (name && email && telephone && password && passwordConfirm) {
            
            if (password == passwordConfirm) {
                const userRegisterJson = JSON.parse(JSON.stringify({name: name, email: email, telephone: telephone, password: password}))
                const res = await userRegister(userRegisterJson, Role.User);
                
                if (res.success) {
                    router.push("/auth/signIn")
                } else {
                    alert("Failed to register")
                }

            } else alert("Passwords do not match")
            
        } else alert("Please fill in all fields")
    }

    return (
        <div className="flex flex-col items-center justify-center mt-72">
            <div className="bg-[#FFFFFF] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96 gap-4">
                <h1 className="text-2xl text-center mb-5">Let's be our family !</h1>
                <TextField id="name" label="name" variant="standard"  onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                <TextField id="email" label="email" variant="standard" type="email" onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                <TextField id="telephone" label="telephone" variant="standard" type="tel" onChange={(e) => setTelephone(e.target.value)} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                <TextField id="password" label="password" variant="standard" type="password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                <TextField id="passwordConfirm" label="confirm password" variant="standard" type="password" onChange={(e) => setPasswordConfirm(e.target.value)} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                <button onClick={() => onSubmit()} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">Register</button>
                <h2  className="mt-5 text-sm text-center">If you already have account <Link href={"/auth/signIn"} className="text-blue-600">Sign-In</Link></h2>
            </div>
            
        </div>
    )
}