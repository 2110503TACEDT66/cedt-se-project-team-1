"use client"
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { CircularProgress } from "@mui/material";
import Loader from "@/components/Loader";

export default function SignOutPage() {
    useEffect(() => {
        signOut({ redirect: true, callbackUrl: "/" });
    }, []);

    return (
        <div  className="flex flex-col justify-center items-center mt-72">
            <CircularProgress/>
            <p>Signing out...</p>
        </div>
    )
}
