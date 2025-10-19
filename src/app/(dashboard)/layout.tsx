import { AppLogo } from "@/components/app-logo";
import { DashboardHeader } from "@/components/dashboard/header";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { UserNav } from "@/components/dashboard/user-nav";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
        <div className="min-h-screen">
          <Sidebar collapsible="icon" side="left">
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <AppLogo className="size-8" />
                <span className="font-headline text-lg font-bold text-sidebar-foreground">
                  PAI Academy
                </span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <UserNav />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <DashboardHeader />
            <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
}
