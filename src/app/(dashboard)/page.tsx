"use client"

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/layouts/dashboard-layout"
import { authClient } from "@/lib/auth/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [hasAdminPermission, setHasAdminPermission] = useState(false)
  const { data: session, isPending: loading } = authClient.useSession()
  const { data: activeOrganization, isPending: activeOrganizationPending } = authClient.useActiveOrganization()


  if (loading || activeOrganizationPending) {
    return <div>Loading...</div>
  }

  if (!activeOrganization)
    router.push('/onboarding')

  return (
    <DashboardLayout>
      <div className="my-6 px-4 max-w-md mx-auto">
        <div className="text-center space-y-6">
          {session == null ? (
            <>
              <h1 className="text-3xl font-bold">Welcome to Our App</h1>
              <Button asChild size="lg">
                <Link href="/auth/login">Sign In / Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Welcome {session.user.name}!</h1>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/organizations">Organizations</Link>
                </Button>
                {hasAdminPermission && (
                  <Button variant="outline" asChild size="lg">
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <BetterAuthActionButton
                  size="lg"
                  variant="destructive"
                  action={() => authClient.signOut()}
                >
                  Sign Out
                </BetterAuthActionButton>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
