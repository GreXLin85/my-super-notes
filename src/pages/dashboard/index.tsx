import { useSession, getSession, signOut } from "next-auth/react"
import { Loading } from "~/components/LoadingPage"
import { Unauthorized } from "~/components/UnauthorizedPage"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated") {
    return <Unauthorized />
  }

  return (
    <div className="">
      
    </div>
  )
}