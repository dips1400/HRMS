import { TrendingUp, Award, Target, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const stats = [
  { label: "Pending Reviews", value: "45", icon: AlertCircle, color: "text-yellow-600" },
  { label: "Completed Reviews", value: "2,802", icon: Award, color: "text-green-600" },
  { label: "Average Rating", value: "4.2/5", icon: TrendingUp, color: "text-blue-600" },
  { label: "Goals Achieved", value: "87%", icon: Target, color: "text-purple-600" },
];

const performanceData = [
  { subject: "Quality of Work", rating: 85 },
  { subject: "Punctuality", rating: 92 },
  { subject: "Teamwork", rating: 78 },
  { subject: "Communication", rating: 88 },
  { subject: "Leadership", rating: 75 },
  { subject: "Innovation", rating: 80 },
];

const departmentPerformance = [
  { department: "Administration", average: 4.3 },
  { department: "Education", average: 4.5 },
  { department: "Health", average: 4.1 },
  { department: "Public Works", average: 3.9 },
  { department: "Finance", average: 4.2 },
];

const recentReviews = [
  {
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    department: "Administration",
    reviewPeriod: "Jan 2026",
    rating: 4.5,
    status: "Completed",
    reviewer: "Manager A"
  },
  {
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    department: "Education",
    reviewPeriod: "Jan 2026",
    rating: 4.8,
    status: "Completed",
    reviewer: "Manager B"
  },
  {
    employeeId: "EMP005",
    employeeName: "Suresh Yadav",
    department: "Finance",
    reviewPeriod: "Feb 2026",
    rating: null,
    status: "Pending",
    reviewer: "Manager C"
  },
];

export function Performance() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Performance Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and evaluate employee performance
          </p>
        </div>
        <Button>Conduct Review</Button>
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
            <CardTitle>Performance Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Average Rating" dataKey="rating" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="average" fill="#10b981" name="Average Rating" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Review Period</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReviews.map((review) => (
                <TableRow key={review.employeeId}>
                  <TableCell className="font-medium">{review.employeeId}</TableCell>
                  <TableCell>{review.employeeName}</TableCell>
                  <TableCell>{review.department}</TableCell>
                  <TableCell>{review.reviewPeriod}</TableCell>
                  <TableCell>
                    {review.rating ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.rating}</span>
                        <span className="text-gray-500">/5</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>
                    <Badge variant={review.status === "Completed" ? "default" : "secondary"}>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
                      {review.status === "Completed" ? "View" : "Complete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Goals & Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Organizational Goals Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { goal: "Improve Service Delivery", progress: 75 },
              { goal: "Employee Skill Development", progress: 60 },
              { goal: "Digital Transformation", progress: 85 },
              { goal: "Cost Optimization", progress: 45 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.goal}</span>
                  <span className="text-sm text-gray-600">{item.progress}%</span>
                </div>
                <Progress value={item.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
