import { Container } from "@mantine/core"
import React, { useRef } from "react"
import { useIntersection } from '@mantine/hooks';
import SignInButton from "./SignInButton";

export default function Hero() {
    const heroRef = useRef();

    // Intersection observers
    const { ref: heroRefIO, entry: heroEntryIO } = useIntersection({
        root: heroRef.current,
        threshold: 1,
    });

    return <Container ref={heroRef} style={{
        opacity: heroEntryIO?.isIntersecting ? 0 : 1,
    }} className="mt-52  flex flex-col justify-center w-full transition-all" size={"xl"}>
        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center">
            <p>Write great <span className="text-cyan-500">notes</span></p>
            <p>with great <span className="text-green-500">AI</span> based editor</p>
        </h1>
        <h3 className="text-lg leading-normal text-muted-foreground mt-10 text-center text-gray-500">
            <p>Quickly create your notes with built-in AI features</p>
        </h3>
        <div className="flex justify-center mt-5">
            <SignInButton>Get started with Google</SignInButton>
        </div>

    </Container>
}