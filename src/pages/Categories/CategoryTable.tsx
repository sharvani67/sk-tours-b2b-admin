import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Pencil, Trash2, Search, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { API_URL } from "@/config/api";
import CategoryForm from "./CategoryForm";

type Category = {
  id: number;
  category_name: string;
  created_at: string;
};

type SortKey = "category_name" | "created_at";

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/api/categories`);
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= FILTER + SORT ================= */
  const processed = useMemo(() => {
    let data = categories.filter((c) =>
      c.category_name.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (A < B) return sortDir === "asc" ? -1 : 1;
      if (A > B) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [categories, search, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const rows = processed.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  /* ================= DELETE ================= */
  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;

    await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
    });

    fetchCategories();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Categories</h1>
            <p className="text-muted-foreground">Manage product categories</p>
          </div>

          <Button onClick={() => { setEditData(null); setOpenForm(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </div>

        
        {openForm && (
          <CategoryForm
            onClose={() => setOpenForm(false)}
            refresh={fetchCategories}
            editData={editData}
          />
        )}

        <Card>
          <CardHeader>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
              <Input
                className="pl-9"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left uppercase">

                      <th
                        onClick={() => toggleSort("category_name")}
                        className="cursor-pointer py-3"
                      >
                        Category Name
                        {sortKey === "category_name" &&
                          (sortDir === "asc" ? <ChevronUp /> : <ChevronDown />)}
                      </th>

                      <th
                        onClick={() => toggleSort("created_at")}
                        className="cursor-pointer py-3"
                      >
                        Created
                        {sortKey === "created_at" &&
                          (sortDir === "asc" ? <ChevronUp /> : <ChevronDown />)}
                      </th>

                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((c) => (
                      <tr key={c.id} className="border-b hover:bg-muted/40">
                        <td className="py-3 font-medium">
                          {c.category_name}
                        </td>

                        <td>
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>

                        <td className="flex gap-2 py-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setEditData(c);
                              setOpenForm(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => deleteCategory(c.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
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

