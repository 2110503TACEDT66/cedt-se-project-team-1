"use client"
import { TextField } from "@mui/material"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function SignInPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async () => {

        if (username && password) {
            const result = await signIn("credentials", {
                username: username,
                password: password,
                redirect: true,
                callbackUrl: "/",
            })
        }

    }

    return (
        <div className="flex flex-col items-center justify-center mt-80"> 
            <div className="bg-[#FFFFFF] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-96 gap-4">
                <h1 className="text-2xl text-center mb-5">Welcome !</h1>
                    <TextField id="Username" label="Username" variant="standard" type="email" onChange={(e) => (setUsername(e.target.value))} className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"/>
                    <TextField id="Password" label="Password" variant="standard" type="password" className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-500"
                    onChange={(e) => (setPassword(e.target.value))}/>
                <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5" onClick={() => onSubmit()}>Sign-In</button>
                <h2 className="mt-5 text-sm text-center">Don't have an account? <Link href={"/auth/signUp"} className="text-blue-600">Sign-Up</Link></h2>
            </div>    
        </div>
    )
}