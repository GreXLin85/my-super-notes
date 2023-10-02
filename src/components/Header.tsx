import React from "react"
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";
import GoToDashboardButton from "./GoToDashboardButton";

export default function Header() {
    const { data: session, status } = useSession()


    return <header className="flex flex-row top-0 fixed justify-between md:justify-around items-center p-4 z-50 w-full border-b backdrop-blur-md ">
        <span className="font-black text-base md:text-xl hover:tracking-wide transition-all">
            My Super 📝s
        </span>
        {status === "authenticated" && <GoToDashboardButton />}

        {(status === "unauthenticated" || status === "loading") && <SignInButton>Sign in with Google</SignInButton>}
    </header>
}