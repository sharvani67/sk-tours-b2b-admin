import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

const AdminLayout = ({ children }) => {
  return (
   <div className="flex h-screen w-full overflow-hidden">

  {/* SIDEBAR */}
  <div className="w-60 shrink-0">
    <AdminSidebar />
  </div>

  {/* RIGHT SIDE */}
  <div className="flex-1 flex flex-col min-w-0">

    <AdminHeader />

    <main className="flex-1 bg-[#f5f6fa] p-6 overflow-auto">
      {children}
    </main>

  </div>
</div>
  );
};

export default AdminLayout;