import { Button } from "@mantine/core"
import { useRouter } from "next/router";
import React from "react"
import useIsGoingToDashboardStore from "~/store/isGoingToDashboard";

export default function GoToDashboardButton() {
    const { isGoingToDashboard, toggle } = useIsGoingToDashboardStore()
    const router = useRouter()

    return <Button
        onClick={async (e) => {
            e.preventDefault()
            toggle()
            await router.push("/dashboard")
        }}
        loading={isGoingToDashboard}
        className={"hover:shadow-lg transition-all"}
    >
        Go to Notes
    </Button>
}