import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <Card className="stat-card-gradient border-border/50 shadow-sm animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <p
              className={`text-xs font-medium ${
                changeType === "positive"
                  ? "text-success"
                  : changeType === "negative"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {change}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
