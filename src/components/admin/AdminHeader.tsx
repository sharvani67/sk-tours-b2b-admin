import { useNavigate } from "react-router-dom";

export function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
<header className="h-16 bg-[#0b2c5f] flex items-center justify-between px-6 text-white relative">

      {/* LEFT (EMPTY or sidebar toggle if needed) */}
      <div className="w-[200px]" />

      {/* CENTER TITLE */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold tracking-wide">
    Admin Panel
  </div>

      {/* RIGHT BUTTONS */}
      <div className="flex items-center gap-3">

        {/* <button className="px-4 py-1.5 bg-red-500 rounded-md text-sm hover:bg-red-600">
          Sign in
        </button> */}

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 bg-red-500 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </header>
  );
}