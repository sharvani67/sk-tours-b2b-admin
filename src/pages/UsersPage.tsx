import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import * as XLSX from "xlsx";

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
const normalizeKey = (obj: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.trim().toLowerCase()] = obj[key];
  });
  return newObj;
};

const isEmpty = (val: any) =>
  !val || String(val).trim() === "";
/* ================= TYPES ================= */
type User = {
  id: number;
  role: "agent" | "supplier";
  company_name: string;
  contact_person: string;
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

const [roleFilter, setRoleFilter] = useState("all");
const [roleInput, setRoleInput] = useState("all");
const [previewData, setPreviewData] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 8;
const handleFileUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

// ✅ normalize keys here
const cleaned = jsonData.map((row: any) => normalizeKey(row));

setPreviewData(cleaned);
};
  /* ================= FETCH ================= */
  useEffect(() => {
    fetch(`${API_URL}/api/admin/users`)
      .then((r) => r.json())
      .then((d) => {
        setUsers(d);
        setLoading(false);
      });
  }, []);
const isValidMobile = (val: any) => {
  return /^[0-9]{10,}$/.test(String(val).trim());
};

const transformRow = (r: any) => {
  let mobile = String(r["contact no"] || "").trim();

  // ❌ If mobile is invalid (like address), ignore it
  if (!isValidMobile(mobile)) {
    mobile = "";
  }

  return {
    role: "agent",
    company_name: r["company name"],
    contact_person: r["name"],
  email: r["email id"]?.trim() || "",
    mobiles: mobile ? [mobile] : [],
    area: r["address"],
    city: "",
    state: "",
    agent_type: "Domestic",
    gst_applicable: "no",
    allow_duplicate: true,
  };
};
const validateRow = (r: any) => {
  if (isEmpty(r["company name"])) return "Company missing";
  if (isEmpty(r["name"])) return "Name missing";
  if (isEmpty(r["email id"])) return "Email missing";

  const mobile = String(r["contact no"] || "").trim();

  if (!/^[0-9]{10,}$/.test(mobile)) {
    return "Invalid mobile";
  }

  return null;
};
const handleImport = async () => {

  const errors: any[] = [];

  const validRows = previewData.filter((r, index) => {
    const err = validateRow(r);
    if (err) {
      errors.push({ row: index + 1, error: err });
      return false;
    }
    return true;
  });

  // ❌ show errors but DON'T block import
  if (errors.length) {
    console.table(errors);
    toast.error(`${errors.length} invalid rows skipped`);
  }

  if (validRows.length === 0) {
    toast.error("No valid rows to import");
    return;
  }

  const formatted = validRows.map(transformRow);

  const res = await fetch(`${API_URL}/api/admin/import-users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: formatted }),
  });

  const data = await res.json();

  toast.success(`Imported ${data.success}`);

  if (data.failed.length) {
    toast.error(`${data.failed.length} rows failed`);
    console.table(data.failed);
  }
};
  /* ================= FILTER + SORT ================= */
const processed = useMemo(() => {
  let data = [...users];

if (search) {
  const searchVal = search.toLowerCase();

  data = data.filter((u) => {
    const nameToSearch =
      u.role === "supplier"
        ? u.company_name
        : u.contact_person;

    return (
      nameToSearch?.toLowerCase().includes(searchVal) ||
      u.company_name?.toLowerCase().includes(searchVal) || // optional
      u.contact_person?.toLowerCase().includes(searchVal) || // optional
      u.email?.toLowerCase().includes(searchVal)
    );
  });
}

 if (roleFilter !== "all") {
  data = data.filter((u) => u.role === roleFilter as "agent" | "supplier");
}

  data.sort((a, b) => {
   const A =
  sortKey === "created_at"
    ? new Date(a.created_at).getTime()
    : a[sortKey];

const B =
  sortKey === "created_at"
    ? new Date(b.created_at).getTime()
    : b[sortKey];

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
          <Button onClick={() => navigate('/user-form')}>
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

            <Select value={roleInput} onValueChange={setRoleInput}>
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

            <Button
  variant="secondary"
  onClick={() => {
    setSearch("");
    setSearchInput("");
    setRoleFilter("all");
    setRoleInput("all");
    setPage(1);
  }}
>
  Clear
</Button>
<input
  type="file"
  accept=".xlsx, .xls"
  onChange={handleFileUpload}
  className="hidden"
  id="excelUpload"
/>

<Button onClick={() => document.getElementById("excelUpload")?.click()}>
  Import Excel
</Button>
          </CardHeader>

          <CardContent>
{previewData.length > 0 && (
  <div className="mt-4 border rounded-lg shadow-sm bg-white">

    {/* HEADER */}
    <div className="flex justify-between items-center p-3 border-b">
      <h3 className="font-semibold text-lg">Preview</h3>
      <span className="text-sm text-muted-foreground">
        {previewData.length} rows found
      </span>
    </div>

    {/* SCROLLABLE TABLE */}
    <div className="max-h-[350px] overflow-auto">

      <table className="w-full text-sm border-collapse">

        {/* TABLE HEADER */}
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            {Object.keys(previewData[0]).map((key) => (
              <th
                key={key}
                className="px-3 py-2 text-left font-semibold border-b whitespace-nowrap"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {previewData.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 border-b"
            >
              {Object.values(row).map((val: any, j) => (
                <td
                  key={j}
                  className="px-3 py-2 whitespace-nowrap"
                >
                  {val || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>

    {/* FOOTER */}
    <div className="flex justify-end p-3 border-t">
      <Button onClick={handleImport}>
        Confirm Import
      </Button>
    </div>

  </div>
)}
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead className="uppercase">
                    <tr className="border-b text-left">

                     <th
  onClick={() => toggleSort("company_name")}
  className="cursor-pointer py-3 heading"
>
  Company / Person{" "}
  {sortKey === "company_name" &&
    (sortDir === "asc" ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
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

                       <td className="py-3 font-medium">
  {u.role === "supplier"
    ? u.company_name
    : u.contact_person}
</td>

                        <td className="hidden md:table-cell">
  {u.email?.split(",")[0]}
  {u.email?.includes(",") && (
    <span className="text-xs text-muted-foreground ml-1">
      +{u.email.split(",").length - 1}
    </span>
  )}
</td>

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
                        <td className="py-2">
  <div className="flex gap-2">



                          {/* VIEW */}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => navigate(`/users/${u.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          {/* EDIT (future) */}
                          <Button
  size="icon"
  variant="outline"
  onClick={() => navigate(`/user-form/${u.id}`)}
>
                            <Pencil className="w-4 h-4" />
                          </Button>

                          {/* DELETE */}
                          <Button size="icon" variant="destructive"
                            onClick={() => deleteUser(u.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                          {u.role === "supplier" && (
                            <Button
                              size="icon"
                              variant="secondary"
                              onClick={() => navigate(`/add-property/${u.id}`)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
</div>
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