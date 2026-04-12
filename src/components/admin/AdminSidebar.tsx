import {
  LayoutDashboard,
  Users,
  Handshake,
  Settings,
  MapPin,
} from "lucide-react";
import { Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Bookings", path: "/bookings", icon: Handshake },
  { name: "Properties", path: "/properties", icon: Settings },
  { name: "Categories", path: "/categories", icon: Handshake },
  { name: "States", path: "/states", icon: MapPin },
  { name: "Videos", path: "/videos", icon: Video },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <div className="w-60 h-screen bg-[#0b2c5f] text-white flex flex-col">

      {/* LOGO */}
      <div className="h-16 flex items-center justify-center bg-[#0b2c5f] shadow-inner">
  <img
    src="/b2blogo.png"
    className="h-16 mt-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
  />
</div>

      {/* MENU */}
      <div className="flex-1 px-4 py-8 mt-5">

        <p className="text-[11px] text-white/60 mb-3 tracking-widest">
          MAIN NAVIGATION
        </p>

        <div className="flex flex-col gap-3">

          {menu.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/5"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}

        </div>
      </div>
    </div>
  );
}