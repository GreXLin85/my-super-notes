import React from "react"
import SignInButton from "./SignInButton";

export default function Header() {
    return <header className="flex flex-row top-0 fixed justify-between md:justify-around items-center p-4 z-50 w-full border-b backdrop-blur-md ">
        <span className="font-black text-base md:text-xl hover:tracking-wide transition-all">
            My Super 📝s
        </span>
        <SignInButton>Sign in with Google</SignInButton>
    </header>
}