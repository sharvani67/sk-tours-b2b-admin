import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Search, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { API_URL } from "@/config/api";
import StateForm from "./StateForm";
import { toast } from "@/components/ui/sonner";


type StateType = {
  id: number;
  state_name: string;
  status: number;
  created_at: string;
};

type SortKey = "state_name" | "created_at";

export default function StateTable() {
  const [states, setStates] = useState<StateType[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<StateType | null>(null);

  /* ================= FETCH ================= */
  const fetchStates = async () => {
    const res = await fetch(`${API_URL}/api/states`);
    const data = await res.json();
    setStates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  /* ================= FILTER + SORT ================= */
  const processed = useMemo(() => {
    let data = states.filter((s) =>
      s.state_name.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [states, search, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const rows = processed.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  /* ================= DELETE ================= */
const deleteState = async (id: number) => {
  if (!confirm("Delete this state?")) return;

  try {
    await fetch(`${API_URL}/api/states/${id}`, {
      method: "DELETE",
    });

    setStates(states.filter(s => s.id !== id));

    toast.success("State deleted successfully 🗑️");

  } catch (error) {
    toast.error("Delete failed ❌");
  }
};

  /* ================= STATUS TOGGLE ================= */
const toggleStatus = async (id: number, current: number) => {
  const newValue = current === 1 ? 0 : 1;

  try {
    await fetch(`${API_URL}/api/states/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newValue }),
    });

    setStates(states.map(s =>
      s.id === id ? { ...s, status: newValue } : s
    ));

    toast.success(
      newValue === 1
        ? "State activated ✅"
        : "State deactivated ❌"
    );

  } catch (error) {
    toast.error("Failed to update status ❌");
  }
};

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">States</h1>
            <p className="text-muted-foreground">Manage states</p>
          </div>

          <Button
            onClick={() => {
              setEditData(null);
              setOpenForm(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> Add State
          </Button>
        </div>

        {/* FORM */}
        {openForm && (
          <StateForm
            onClose={() => setOpenForm(false)}
            refresh={fetchStates}
            editData={editData}
          />
        )}

        <Card className="p-6 space-y-6">

          {/* SEARCH */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search state..."
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

          <CardContent>
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left uppercase">
                      <th                      
                        className="cursor-pointer py-3">State Name</th>                                                                                    
                      <th className="cursor-pointer py-3">Created</th>                                                                                                         
                      <th className="py-3">Status</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((s) => (
                      <tr key={s.id} className="border-b hover:bg-muted/40">

                        <td className="py-3 font-medium">{s.state_name}</td>

                        <td>
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>

                       <td>
  <button
    onClick={() => toggleStatus(s.id, s.status)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition hover:opacity-80
      ${s.status === 1 ? "bg-green-500" : "bg-red-500"}
    `}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
        ${s.status === 1 ? "translate-x-6" : "translate-x-1"}
      `}
    />
  </button>
</td>

                        <td className="flex gap-2 py-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setEditData(s);
                              setOpenForm(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => deleteState(s.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>

                      </tr>
                    ))}

                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-muted-foreground">
                          No States found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="flex justify-between items-center pt-4">
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
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}