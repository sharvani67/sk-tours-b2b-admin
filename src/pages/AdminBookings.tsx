import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/config/api";
import { Eye, Search, Trash2 } from "lucide-react";

export default function AdminBookings() {

  const navigate = useNavigate();

  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [statusInput, setStatusInput] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 8;
  const totalPages = Math.ceil(total / limit);

  const fetchBookings = async () => {
    const res = await fetch(
      `${API_URL}/api/admin/bookings?page=${page}&limit=${limit}&search=${search}&status=${statusFilter}`
    );

    const data = await res.json();
    setBookings(data.data);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchBookings();
  }, [page, search, statusFilter]);
  

  const deleteBooking = async (id: number) => {
    if (!confirm("Delete this booking?")) return;

    await fetch(`${API_URL}/api/admin/delete-booking/${id}`, {
      method: "DELETE",
    });

    fetchBookings();
  };

  return (
    <AdminLayout>
            <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            All Bookings
          </h1>

          
        </div>
<Card className="p-6 space-y-6">
        {/* SEARCH + FILTER */}
     <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">

  {/* Search Input */}
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      placeholder="Search booking, agent or property..."
       className="pl-9"
      value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
    />
  </div>
<Button
      onClick={() => {
        setPage(1);
        setSearch(searchInput);
      }}
    >
      Search
    </Button>
  {/* Status Filter */}
  <select
    className="h-10 border rounded-lg px-3 bg-background min-w-[160px]"
    value={statusInput}
  onChange={(e) => setStatusInput(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Confirmed">Confirmed</option>
  </select>
<Button
  variant="outline"
  onClick={() => {
    setPage(1);
    setStatusFilter(statusInput);
  }}
>
  Filter
</Button>
</div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="border-b text-left">
            <tr>
              <th className="py-3">Booking No</th>
              <th>Agent</th>
              <th>Property</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-muted/30">
                <td className="py-3 font-semibold">{b.booking_number}</td>
                <td>{b.agent_name}</td>
                <td>{b.property_name}</td>
                <td>₹{b.total_amount}</td>
                <td>
  <span
    className={
      b.status === "Confirmed"
        ? "px-3 py-1 text-xs rounded-full bg-green-100 text-green-600"
        : b.status === "Cancelled"
        ? "px-3 py-1 text-xs rounded-full bg-red-100 text-red-600"
        : "px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600"
    }
  >
    {b.status}
  </span>
</td>
                <td>{new Date(b.created_at).toLocaleDateString()}</td>

                <td className="text-left space-x-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/admin/booking/${b.booking_number}`)
                    }
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteBooking(b.id)}
                  >
                     <Trash2 className="w-4 h-4" />
                  </Button>
                </td>

              </tr>
            ))}
             {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No Bookings found
                  </td>
                </tr>
              )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>

            <Button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

      </Card>
      </div>
    </AdminLayout>
  );
}