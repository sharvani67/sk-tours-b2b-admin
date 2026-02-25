import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, MoreHorizontal } from "lucide-react";

const dealsData = [
  { id: "D-1024", partner: "TechCorp Ltd", type: "Agent", amount: "$12,500", status: "Active", created: "Feb 23, 2026", expires: "Aug 23, 2026" },
  { id: "D-1023", partner: "Global Supplies", type: "Supplier", amount: "$8,200", status: "Pending", created: "Feb 22, 2026", expires: "Aug 22, 2026" },
  { id: "D-1022", partner: "MegaTrade Inc", type: "Agent", amount: "$23,100", status: "Active", created: "Feb 21, 2026", expires: "Aug 21, 2026" },
  { id: "D-1021", partner: "FastLogistics", type: "Supplier", amount: "$5,800", status: "Completed", created: "Feb 20, 2026", expires: "N/A" },
  { id: "D-1020", partner: "ProServices", type: "Agent", amount: "$15,400", status: "Active", created: "Feb 19, 2026", expires: "Aug 19, 2026" },
  { id: "D-1019", partner: "AlphaNet", type: "Supplier", amount: "$9,700", status: "Cancelled", created: "Feb 18, 2026", expires: "N/A" },
  { id: "D-1018", partner: "BrightStar", type: "Agent", amount: "$18,300", status: "Active", created: "Feb 17, 2026", expires: "Aug 17, 2026" },
  { id: "D-1017", partner: "CoreTech", type: "Supplier", amount: "$11,600", status: "Pending", created: "Feb 16, 2026", expires: "Aug 16, 2026" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-muted text-muted-foreground border-muted",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const DealsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = dealsData.filter((d) => {
    const matchSearch = d.partner.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage partnership deals and orders</p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="w-4 h-4 mr-2" /> New Deal
          </Button>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-muted/50 border-transparent"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Deal ID</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Partner</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden md:table-cell">Type</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden lg:table-cell">Created</th>
                    <th className="py-3 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((deal) => (
                    <tr key={deal.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium">{deal.id}</td>
                      <td className="py-3 px-2">{deal.partner}</td>
                      <td className="py-3 px-2 hidden md:table-cell text-muted-foreground">{deal.type}</td>
                      <td className="py-3 px-2 font-semibold">{deal.amount}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline" className={statusColors[deal.status]}>{deal.status}</Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground hidden lg:table-cell">{deal.created}</td>
                      <td className="py-3 px-2">
                        <button className="p-1 rounded hover:bg-muted transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DealsPage;
