import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router";

const stats = [
  { label: "Total Payroll (Monthly)", value: "₹1.85 Cr", icon: DollarSign, color: "text-green-600" },
  { label: "Employees Paid", value: "2,847", icon: Users, color: "text-blue-600" },
  { label: "Pending Payments", value: "12", icon: Calendar, color: "text-yellow-600" },
  { label: "YTD Payroll", value: "₹3.7 Cr", icon: TrendingUp, color: "text-purple-600" },
];

const monthlyData = [
  { month: "Aug", amount: 17500000 },
  { month: "Sep", amount: 17800000 },
  { month: "Oct", amount: 18000000 },
  { month: "Nov", amount: 18200000 },
  { month: "Dec", amount: 18500000 },
  { month: "Jan", amount: 18300000 },
  { month: "Feb", amount: 18500000 },
];

const departmentPayroll = [
  { department: "Administration", amount: 4500000 },
  { department: "Education", amount: 6800000 },
  { department: "Health", amount: 4200000 },
  { department: "Public Works", amount: 2100000 },
  { department: "Finance", amount: 900000 },
];

const recentPayments = [
  { id: "PAY001", employee: "Rajesh Kumar", amount: "₹67,000", date: "2026-02-01", status: "Completed" },
  { id: "PAY002", employee: "Priya Sharma", amount: "₹85,000", date: "2026-02-01", status: "Completed" },
  { id: "PAY003", employee: "Amit Singh", amount: "₹72,000", date: "2026-02-01", status: "Completed" },
  { id: "PAY004", employee: "Neha Patel", amount: "₹58,000", date: "2026-02-01", status: "Pending" },
];

export function PayrollDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Payroll Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee salaries and payroll processing
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/payroll/salary-slips">
            <Button variant="outline">View Salary Slips</Button>
          </Link>
          <Button>Process Payroll</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payroll Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
                <Tooltip formatter={(value: number) => `₹${(value / 10000000).toFixed(2)} Cr`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" name="Payroll Amount" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department-wise Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPayroll}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}L`} />
                <Tooltip formatter={(value: number) => `₹${(value / 1000000).toFixed(2)} Lakhs`} />
                <Bar dataKey="amount" fill="#10b981" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.employee}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
