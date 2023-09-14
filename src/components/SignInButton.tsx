import { Button, rem } from "@mantine/core"
import React from "react"
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from "next-auth/react";
import useIsSigningInStore from "~/store/isSigningIn";

export default function SignInButton({
    children
}: {
    children: React.ReactNode
}) {
    const { isSigningIn, toggle } = useIsSigningInStore()

    return <Button
        leftIcon={<IconBrandGoogle size={rem(18)} />}
        onClick={() => {
            void signIn("google")
            toggle()
        }}
        loading={isSigningIn}
        className={"hover:shadow-lg transition-all"}
    >
        {children}
    </Button>
}