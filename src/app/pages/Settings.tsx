import { Settings as SettingsIcon, Bell, Lock, Database, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

export function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage system settings and configurations
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="Government of India" />
              </div>
              <div>
                <Label htmlFor="orgCode">Organization Code</Label>
                <Input id="orgCode" defaultValue="GOI-001" />
              </div>
              <div>
                <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
                <Select defaultValue="april">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="workingDays">Working Days per Week</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Days</SelectItem>
                    <SelectItem value="5.5">5.5 Days</SelectItem>
                    <SelectItem value="6">6 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Office Start Time</Label>
                  <Input id="startTime" type="time" defaultValue="09:00" />
                </div>
                <div>
                  <Label htmlFor="endTime">Office End Time</Label>
                  <Input id="endTime" type="time" defaultValue="17:30" />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive email updates for important events</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Leave Approval Notifications</p>
                  <p className="text-sm text-gray-600">Get notified when leave requests are submitted</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Attendance Alerts</p>
                  <p className="text-sm text-gray-600">Alert for late arrivals and absences</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payroll Notifications</p>
                  <p className="text-sm text-gray-600">Notify when salary is processed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grievance Updates</p>
                  <p className="text-sm text-gray-600">Updates on grievance status</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Retirement Reminders</p>
                  <p className="text-sm text-gray-600">Reminders for upcoming retirements</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input id="passwordExpiry" type="number" defaultValue="90" />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Require 2FA for all users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">IP Whitelisting</p>
                  <p className="text-sm text-gray-600">Restrict access to specific IP addresses</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Activity Logging</p>
                  <p className="text-sm text-gray-600">Track all login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                <Input id="maxLoginAttempts" type="number" defaultValue="3" />
              </div>
              <Button onClick={handleSave}>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Departments</CardTitle>
                <Button>Add Department</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Administration", employees: 450, head: "Mr. Ramesh Kumar" },
                  { name: "Education", employees: 850, head: "Mrs. Sunita Sharma" },
                  { name: "Health", employees: 620, head: "Dr. Vikram Singh" },
                  { name: "Public Works", employees: 380, head: "Eng. Pradeep Yadav" },
                  { name: "Finance", employees: 290, head: "CA Anjali Gupta" },
                ].map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-gray-600">
                        {dept.employees} employees • Head: {dept.head}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Edit</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Roles & Permissions</CardTitle>
                <Button>Add Role</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { role: "Super Admin", users: 2, description: "Full system access" },
                  { role: "HR Manager", users: 5, description: "Manage employees and HR functions" },
                  { role: "Department Head", users: 15, description: "Manage department operations" },
                  { role: "Finance Officer", users: 8, description: "Manage payroll and finances" },
                  { role: "Employee", users: 2817, description: "Basic employee access" },
                ].map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{role.role}</p>
                      <p className="text-sm text-gray-600">
                        {role.users} users • {role.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Edit Permissions</Button>
                      <Button size="sm" variant="ghost">View Users</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
