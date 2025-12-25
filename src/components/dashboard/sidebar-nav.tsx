"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/lib/data";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import { useLanguage } from "@/hooks/use-language";

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <SidebarMenu>
      {dashboardNavItems.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{t(group.label as any)}</SidebarGroupLabel>
          <SidebarGroupContent>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: t(item.label as any), className: "font-body" }}
                  disabled={item.disabled}
                  aria-disabled={item.disabled}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{t(item.label as any)}</span>
                    {item.disabled && <Badge variant="outline" className="ml-auto">{t('soon')}</Badge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarMenu>
  );
}
