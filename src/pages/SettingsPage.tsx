import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your account and system preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="User" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="admin@b2b.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email notifications", desc: "Receive email updates for new deals" },
                  { label: "New user alerts", desc: "Get notified when new users register" },
                  { label: "Deal status changes", desc: "Alerts when deal statuses update" },
                  { label: "Weekly reports", desc: "Receive a weekly summary report" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">System Configuration</CardTitle>
                <CardDescription>Manage system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue="B2B Partnership Hub" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input defaultValue="support@b2b.com" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Temporarily disable the platform</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
