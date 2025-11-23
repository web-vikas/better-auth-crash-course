"use client"


import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, SidebarSeparator
} from "@/components/ui/sidebar"
import Link from "next/link"
import { navMain } from "@/lib/constant"

export function NavMain() {


  return (
    <SidebarMenu>
      <SidebarSeparator className="px-0 mx-0 mt-2" />
      {
        navMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url} as={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span  >
              </SidebarMenuButton>
            </Link>
            <SidebarSeparator className="px-0 mx-0 mt-2" />
          </SidebarMenuItem>
        ))
      }
    </SidebarMenu>
  )
}
