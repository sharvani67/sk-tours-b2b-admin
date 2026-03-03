import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/config/api";
import { Eye, Search, Trash2 } from "lucide-react";

export default function AdminProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [statusInput, setStatusInput] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchProperties = async () => {
    const res = await fetch(
      `${API_URL}/api/admin/properties?page=${page}&limit=${limit}&search=${search}&status=${statusFilter}`
    );

    const data = await res.json();
    setProperties(data.data);
    setTotal(data.total);
  };

 useEffect(() => {
  fetchProperties();
}, [page, statusFilter, search]);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id: number) => {

  if (!confirm("Are you sure you want to delete this property?")) return;

  await fetch(`${API_URL}/api/admin/delete-property/${id}`, {
    method: "DELETE"
  });

  fetchProperties();
};

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            All Properties
          </h1>

          
        </div>

        {/* Table */}
        <Card className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">

  {/* Search Box + Button */}
  <div className="flex flex-1 gap-2">

    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      
      <Input
        placeholder="Search property, city, supplier..."
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

  </div>

  {/* Status Filter + Button */}
  <div className="flex gap-2">

<select
  className="h-10 border rounded-lg px-3 bg-background min-w-[160px]"
  value={statusInput}
  onChange={(e) => setStatusInput(e.target.value)}
>
  <option value="">All Status</option>
  <option value="Pending">Pending</option>
  <option value="Approved">Approved</option>
  <option value="Rejected">Rejected</option>
  <option value="Inactive">Inactive</option>
  <option value="Deleted">Deleted</option>
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

</div>
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="py-3 text-left">Property</th>
                <th className="text-left">Category</th>
                <th className="text-left">City</th>
                <th className="text-left">Supplier</th>
                <th className="text-left">Created</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-muted/30 transition"
                >
                  <td className="py-3 font-semibold">
                    {p.name}
                  </td>
                  <td>{p.category}</td>
                  <td>{p.city}</td>
                  <td>{p.supplier_name}</td>
                                  
                  <td>
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td>
  <span
    className={
      p.status === "Confirmed"
        ? "px-3 py-1 text-xs rounded-full bg-green-100 text-green-600"
        : p.status === "Cancelled"
        ? "px-3 py-1 text-xs rounded-full bg-red-100 text-red-600"
        : "px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600"
    }
  >
    {p.status}
  </span>
</td>
                  <td className="text-left space-x-2">
                    <Button
                       size="sm"
                        onClick={() => navigate(`/admin/properties/${p.id}`)}
                    >
                    <Eye className="w-4 h-4" />
                    </Button>

                    

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(p.id)}
                  >
                     <Trash2 className="w-4 h-4" />
                  </Button>
                    </td>
                </tr>
              ))}

              {properties.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}