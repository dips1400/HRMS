import { useState } from "react";
import { Search, Download, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const attendanceData = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    department: "Administration",
    date: "2026-02-21",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    status: "Present",
    workHours: "8h 30m"
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    department: "Public Works",
    date: "2026-02-21",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    status: "Present",
    workHours: "8h 30m"
  },
  {
    id: "EMP003",
    name: "Amit Singh",
    department: "Education",
    date: "2026-02-21",
    checkIn: "-",
    checkOut: "-",
    status: "Leave",
    workHours: "-"
  },
  {
    id: "EMP004",
    name: "Neha Patel",
    department: "Health",
    date: "2026-02-21",
    checkIn: "09:30 AM",
    checkOut: "05:15 PM",
    status: "Present",
    workHours: "7h 45m"
  },
  {
    id: "EMP005",
    name: "Suresh Yadav",
    department: "Finance",
    date: "2026-02-21",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    workHours: "-"
  },
  {
    id: "EMP006",
    name: "Sunita Devi",
    department: "Administration",
    date: "2026-02-21",
    checkIn: "08:55 AM",
    checkOut: "05:50 PM",
    status: "Present",
    workHours: "8h 55m"
  },
];

const stats = [
  { label: "Total Present", value: "2,654", icon: CheckCircle, color: "text-green-600" },
  { label: "Total Absent", value: "50", icon: XCircle, color: "text-red-600" },
  { label: "On Leave", value: "143", icon: Calendar, color: "text-yellow-600" },
  { label: "Late Arrivals", value: "28", icon: Clock, color: "text-orange-600" },
];

export function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch = 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Attendance Management</h2>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage daily employee attendance
        </p>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Input type="date" defaultValue="2026-02-21" />
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Public Works">Public Works</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Leave">Leave</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Work Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{record.workHours}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          record.status === "Present" ? "default" :
                          record.status === "Leave" ? "secondary" :
                          "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
