'use client'
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Eye } from "lucide-react"
import { CreateOrganizationButton } from "@/components/organization/create-organization-button"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"

export default function Onboarding() {
    const router = useRouter()
    const { data: activeOrganization, isPending } = authClient.useActiveOrganization()
    if (isPending) return <div>Loading...</div>
    if (activeOrganization) {
        return router.push('/')
    }

    return (
        <div className="flex h-svh w-full">
            <Empty className="border border-dashed">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Eye />
                    </EmptyMedia>
                    <EmptyTitle>Onboarding</EmptyTitle>
                    <EmptyDescription>
                        Seems Like you are new here create your organization first.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <CreateOrganizationButton onSuccess={() => router.push('/')} />
                </EmptyContent>
            </Empty>
        </div>
    )
}