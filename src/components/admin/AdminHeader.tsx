import { Bell, Search, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function AdminHeader() {

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />

        {/* GLOBAL SEARCH */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Search users, deals, companies..."
            className="w-72 pl-9 h-9 rounded-lg bg-muted/50 border border-transparent focus:border-accent focus:bg-card transition"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATIONS */}
        <button className="relative rounded-lg p-2 hover:bg-muted transition">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
        </button>

        {/* USER */}
        <div className="flex items-center gap-3">

          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              AD
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">
              {admin?.email || "admin@b2b.com"}
            </p>
          </div>

        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

      </div>

    </header>
  );
}