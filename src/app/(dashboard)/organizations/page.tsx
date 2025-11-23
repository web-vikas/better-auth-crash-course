import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { OrganizationSelect } from "./_components/organization-select"
import { CreateOrganizationButton } from "../../../components/organization/create-organization-button"
import { OrganizationTabs } from "./_components/organization-tabs"

export default async function OrganizationsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session == null) return redirect("/auth/login")

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="flex items-center mb-8 gap-2">
        <OrganizationSelect />
        <CreateOrganizationButton />
      </div>

      <OrganizationTabs />
    </div>
  )
}
