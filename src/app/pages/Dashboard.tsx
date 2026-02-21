import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Clock, 
  CalendarDays,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

const stats = [
  {
    name: "Total Employees",
    value: "2,847",
    change: "+12",
    trend: "up",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    name: "Present Today",
    value: "2,654",
    change: "93.2%",
    trend: "up",
    icon: Clock,
    color: "bg-green-500"
  },
  {
    name: "On Leave",
    value: "143",
    change: "-5",
    trend: "down",
    icon: CalendarDays,
    color: "bg-yellow-500"
  },
  {
    name: "New Hires (Month)",
    value: "28",
    change: "+8",
    trend: "up",
    icon: UserPlus,
    color: "bg-purple-500"
  },
];

const attendanceData = [
  { month: "Jan", present: 2650, absent: 197 },
  { month: "Feb", present: 2680, absent: 167 },
  { month: "Mar", present: 2720, absent: 127 },
  { month: "Apr", present: 2750, absent: 97 },
  { month: "May", present: 2800, absent: 47 },
  { month: "Jun", present: 2654, absent: 193 },
];

const departmentData = [
  { name: "Administration", value: 450, color: "#3b82f6" },
  { name: "Education", value: 850, color: "#10b981" },
  { name: "Health", value: 620, color: "#f59e0b" },
  { name: "Public Works", value: 380, color: "#ef4444" },
  { name: "Finance", value: 290, color: "#8b5cf6" },
  { name: "Others", value: 257, color: "#6b7280" },
];

const pendingActions = [
  { type: "Leave Approvals", count: 23, priority: "high" },
  { type: "Transfer Requests", count: 8, priority: "medium" },
  { type: "Grievances", count: 12, priority: "high" },
  { type: "Retirement Processing", count: 5, priority: "low" },
  { type: "Performance Reviews", count: 45, priority: "medium" },
];

const recentActivities = [
  { action: "New employee onboarded", employee: "Rajesh Kumar", time: "2 hours ago" },
  { action: "Leave approved", employee: "Priya Sharma", time: "3 hours ago" },
  { action: "Salary processed", employee: "Batch #453", time: "5 hours ago" },
  { action: "Transfer completed", employee: "Amit Singh", time: "1 day ago" },
  { action: "Training completed", employee: "Neha Patel", time: "2 days ago" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of HR operations and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Employees by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className={`h-5 w-5 ${
                      action.priority === 'high' ? 'text-red-500' :
                      action.priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <span className="text-sm font-medium">{action.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      action.priority === 'high' ? 'destructive' :
                      action.priority === 'medium' ? 'default' :
                      'secondary'
                    }>
                      {action.count}
                    </Badge>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.employee}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
