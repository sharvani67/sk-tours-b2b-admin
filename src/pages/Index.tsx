import AdminLayout from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Handshake,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const barData = [
  { month: "Jan", deals: 45, revenue: 28 },
  { month: "Feb", deals: 52, revenue: 34 },
  { month: "Mar", deals: 61, revenue: 42 },
  { month: "Apr", deals: 48, revenue: 31 },
  { month: "May", deals: 73, revenue: 55 },
  { month: "Jun", deals: 68, revenue: 49 },
];

const lineData = [
  { day: "Mon", agents: 120, suppliers: 85 },
  { day: "Tue", agents: 132, suppliers: 91 },
  { day: "Wed", agents: 145, suppliers: 88 },
  { day: "Thu", agents: 155, suppliers: 102 },
  { day: "Fri", agents: 142, suppliers: 95 },
  { day: "Sat", agents: 98, suppliers: 72 },
  { day: "Sun", agents: 85, suppliers: 60 },
];

const recentDeals = [
  { id: "D-1024", partner: "TechCorp Ltd", amount: "$12,500", status: "Active", date: "Feb 23" },
  { id: "D-1023", partner: "Global Supplies", amount: "$8,200", status: "Pending", date: "Feb 22" },
  { id: "D-1022", partner: "MegaTrade Inc", amount: "$23,100", status: "Active", date: "Feb 21" },
  { id: "D-1021", partner: "FastLogistics", amount: "$5,800", status: "Completed", date: "Feb 20" },
  { id: "D-1020", partner: "ProServices", amount: "$15,400", status: "Active", date: "Feb 19" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-muted text-muted-foreground border-muted",
};

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, here's your overview.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="2,847"
            change="+12.5% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Active Deals"
            value="384"
            change="+8.2% from last month"
            changeType="positive"
            icon={Handshake}
          />
          <StatCard
            title="Revenue"
            value="$142.8K"
            change="+23.1% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Growth Rate"
            value="18.2%"
            change="-2.4% from last month"
            changeType="negative"
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Deals & Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="deals" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="agents" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="suppliers" stroke="hsl(var(--success))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Deals</CardTitle>
              <a href="/deals" className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                View All <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Deal ID</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Partner</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Amount</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map((deal) => (
                    <tr key={deal.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-medium">{deal.id}</td>
                      <td className="py-3 px-2">{deal.partner}</td>
                      <td className="py-3 px-2 font-semibold">{deal.amount}</td>
                      <td className="py-3 px-2">
                        <Badge variant="outline" className={statusColors[deal.status]}>
                          {deal.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{deal.date}</td>
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

export default Dashboard;
