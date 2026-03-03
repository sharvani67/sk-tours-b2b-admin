import {
  LayoutDashboard,
  Users,
  Handshake,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Bookings", url: "/bookings", icon: Handshake },
  { title: "Properties", url: "/properties", icon: Settings },
  // { title: "Deals", url: "/deals", icon: Handshake },
  { title: "Categories", url: "/categories", icon: Handshake },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {

  const navigate = useNavigate();
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">

      {/* HEADER */}
      <SidebarHeader className="px-6 py-5 border-b border-sidebar-border" style={{backgroundColor: "#4763A8" }}>
        <div className="flex items-center justify-center">
          <img
            src="/b2blogo.png"
            alt="B2B Partners Logo"
            className="h-18 w-auto object-contain"
          />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-3 py-6" style={{backgroundColor: "#4763A8" }}>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-widest px-3 mb-3">
            Main Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">

              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    >
                      <item.icon className="w-4 h-4 shrink-0 transition-colors group-hover:scale-105" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* FOOTER */}
     <SidebarFooter className="p-4 border-t border-sidebar-border" style={{backgroundColor: "#4763A8" }}>
  <button
    onClick={() => {
  localStorage.removeItem("admin");
  navigate("/");
}}
    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-sidebar-muted transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  >
    <LogOut className="w-4 h-4" />
    <span>Sign Out</span>
  </button>
</SidebarFooter>

    </Sidebar>
  );
}