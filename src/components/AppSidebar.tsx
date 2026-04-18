import {
  LayoutDashboard,
  FileBarChart,
  MapPin,
  Settings,
  Database,
  Shield,
  LogOut,
} from "lucide-react";

import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Results", url: "/results/demo", icon: FileBarChart },
  { title: "Shop Details", url: "/shop/demo", icon: MapPin },
];

const adminItems = [
  { title: "SKU Catalogue", url: "/admin/sku", icon: Database },
  { title: "Model Config", url: "/admin/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, role, userName } = useAuth(); // ✅ using context

  const isActive = (path: string) => location.pathname === path;

  // ✅ Proper logout handler
  const handleLogout = () => {
    logout();

    // role-based redirect
    if (role === "loan_officer") {
      navigate("/login/loan-officer");
    } else {
      navigate("/login/shop-owner");
    }
  };

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Shield className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-heading font-bold text-sidebar-accent-foreground">
                KiranaLens
              </h2>
              <p className="text-xs text-sidebar-foreground/60">
                AI Credit Intelligence
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="flex flex-col gap-3">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
                {userName ? userName[0].toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-xs font-medium text-sidebar-accent-foreground">
                  {userName}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  {role === "loan_officer" ? "Loan Officer" : "Shop Owner"}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="justify-start w-full"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign Out
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}