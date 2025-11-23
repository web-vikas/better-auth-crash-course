"use client"

import * as React from "react"
import { SquircleIcon } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

type OrganizationsSwitcherProps = {
    id: string,
    name: string,
    slug: string,
    logo?: string | null | undefined,
    createdAt: Date,
    // invitations: any[],
    // members: any[],
}


export function OrganizationsSwitcher({
    organization,
}: {
    organization: OrganizationsSwitcherProps
}) {
    const { isMobile } = useSidebar()
    const [activeOrganization, setActiveOrganization] = React.useState(organization)

    if (!activeOrganization) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>

                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <SquircleIcon />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{activeOrganization.name}</span>
                    </div>
                </SidebarMenuButton>

            </SidebarMenuItem>
        </SidebarMenu>
    )
}
