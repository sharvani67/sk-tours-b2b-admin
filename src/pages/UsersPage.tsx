import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { API_URL } from "@/config/api";
import "../index.css"

/* ================= TYPES ================= */
type User = {
  id: number;
  role: "agent" | "supplier";
  company_name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  is_active: number;
  created_at: string;
};

type SortKey = "company_name" | "email" | "created_at";

/* ================= STYLES ================= */
const statusColors: Record<string, string> = {
  approved: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
    const [roleInput, setroleInput] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 8;

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${API_URL}/api/admin/users`)
      .then((r) => r.json())
      .then((d) => {
        setUsers(d);
        setLoading(false);
      });
  }, []);

  /* ================= FILTER + SORT ================= */
  const processed = useMemo(() => {
    let data = users.filter(
      (u) =>
        (u.company_name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())) &&
        (roleFilter === "all" || u.role === roleFilter)
    );

    data.sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [users, search, roleFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const rows = processed.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  /* ================= ACTIONS ================= */
   const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setUsers(users.map(u =>
      u.id === id ? { ...u, status } : u
    ));
  };

const deleteUser = async (id: number) => {
  if (!confirm("Delete this user?")) return;

  await fetch(`${API_URL}/api/admin/delete/${id}`, {
    method: "DELETE",
  });

  setUsers(users.filter(u => u.id !== id));
};

const toggleActive = async (id: number, current: number, company: string) => {

  const newValue = current === 1 ? 0 : 1;

  await fetch(`${API_URL}/api/admin/toggle-active/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: newValue }),
  });

  setUsers(users.map(u =>
    u.id === id ? { ...u, is_active: newValue } : u
  ));

  toast.success(
    newValue === 1
      ? `${company} activated`
      : `${company} deactivated`
  );
};

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold heading">Users</h1>
            <p className="text-muted-foreground">Manage agents & suppliers</p>

           
          </div>
          <Button onClick={()=>navigate('/user-form')}>
            <Plus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </div>

        <Card>
          <CardHeader className="flex gap-3 sm:flex-row flex-col">

            <div className="relative flex-1 mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
              <Input
                className="pl-9"
                placeholder="Search company or email..."
                value={roleInput}
                onChange={(e) => setroleInput(e.target.value)}
              />
            </div>
            <Button
      onClick={() => {
        setPage(1);
        setSearch(roleInput);
      }}
    >
      Search
    </Button>

  <Select value={roleInput} onValueChange={setroleInput}>
    <SelectTrigger className="w-40 h-42">
      <SelectValue placeholder="Role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="agent">Agent</SelectItem>
      <SelectItem value="supplier">Supplier</SelectItem>
    </SelectContent>
  </Select>
            <Button
  variant="outline"
  onClick={() => {
    setPage(1);
    setRoleFilter(roleInput);
  }}
>
  Filter
</Button>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead className="uppercase">
                    <tr className="border-b text-left">

                      <th onClick={() => toggleSort("company_name")}
                        className="cursor-pointer py-3 heading">
                        Company {sortKey === "company_name" && (sortDir === "asc" ? <ChevronUp /> : <ChevronDown />)}
                      </th>

                      <th onClick={() => toggleSort("email")}
                        className="cursor-pointer py-3 hidden md:table-cell heading">
                        Email
                      </th>

                      <th className="py-3 heading">Role</th>
                      <th className="py-3 heading">Status</th>

                      <th onClick={() => toggleSort("created_at")}
                        className="cursor-pointer py-3 hidden lg:table-cell heading">
                        Joined
                      </th>

                      <th className="py-3 heading">Active</th>

                      <th className="cursor-pointer py-3 hidden lg:table-cell heading">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((u) => (
                      <tr key={u.id} className="border-b hover:bg-muted/40">

                        <td className="py-3 font-medium">{u.company_name}</td>

                        <td className="hidden md:table-cell">{u.email}</td>

                        <td>{u.role}</td>

                        <td>
                          <Badge variant="outline" className={statusColors[u.status]}>
                            {u.status}
                          </Badge>
                        </td>

                        <td className="hidden lg:table-cell">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
<td>
  <button
    onClick={() => toggleActive(u.id, u.is_active, u.company_name)}
  className={`relative inline-flex h-6 w-11 items-center rounded-full transition hover:opacity-80
${u.is_active ? "bg-green-500" : "bg-red-500"}
    `}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
        ${u.is_active ? "translate-x-6" : "translate-x-1"}
      `}
    />
  </button>
</td>
                        <td className="flex gap-2 py-2">

                          {/* VIEW */}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate(`/users/${u.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          {/* EDIT (future) */}
                          <Button size="icon" variant="outline">
                            <Pencil className="w-4 h-4" />
                          </Button>

                          {/* DELETE */}
                          <Button size="icon" variant="destructive"
                            onClick={() => deleteUser(u.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                        </td>

                      </tr>
                    ))}
                    {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No Users found
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
                    <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                      Prev
                    </Button>
                    <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
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