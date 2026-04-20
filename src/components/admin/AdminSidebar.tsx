import {
  LayoutDashboard,
  Users,
  Handshake,
  Settings,
  MapPin,
} from "lucide-react";
import { Video } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  return (
    <div className="w-60 h-screen bg-[#0b2c5f] text-white flex flex-col">
      {/* LOGO */}
      <div className="flex items-center">
        <div className="relative group cursor-pointer mt-2">
          <Link
            to="/"
            className="flex items-center bg-white p-[2px] rounded-[10px]
             shadow-[0_0_30px_10px_rgba(255,255,255,0.8)]"
          >
            <img src="/b2blogo.png" alt="Logo" className="h-12 w-44" />
          </Link>
        </div>
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
                className={() => {
                  const isUsersActive =
                    location.pathname.startsWith("/users") ||
                    location.pathname.startsWith("/user-form") ||
                    location.pathname.startsWith("/add-property");

                  const isActive =
                    item.path === "/users"
                      ? isUsersActive
                      : location.pathname.startsWith(item.path);

                  return `flex items-center gap-3 px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/5"
                  }`;
                }}
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
