import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Download, Plus, Eye, Edit, Trash2 } from "lucide-react";
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

const employees = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    designation: "Senior Clerk",
    department: "Administration",
    grade: "Grade-II",
    joiningDate: "2015-03-15",
    status: "Active",
    phone: "+91 9876543210",
    email: "rajesh.kumar@gov.in"
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    designation: "Assistant Engineer",
    department: "Public Works",
    grade: "Grade-I",
    joiningDate: "2018-07-22",
    status: "Active",
    phone: "+91 9876543211",
    email: "priya.sharma@gov.in"
  },
  {
    id: "EMP003",
    name: "Amit Singh",
    designation: "Teacher",
    department: "Education",
    grade: "Grade-II",
    joiningDate: "2012-06-10",
    status: "Active",
    phone: "+91 9876543212",
    email: "amit.singh@gov.in"
  },
  {
    id: "EMP004",
    name: "Neha Patel",
    designation: "Staff Nurse",
    department: "Health",
    grade: "Grade-III",
    joiningDate: "2019-01-05",
    status: "Active",
    phone: "+91 9876543213",
    email: "neha.patel@gov.in"
  },
  {
    id: "EMP005",
    name: "Suresh Yadav",
    designation: "Accountant",
    department: "Finance",
    grade: "Grade-II",
    joiningDate: "2016-11-20",
    status: "On Leave",
    phone: "+91 9876543214",
    email: "suresh.yadav@gov.in"
  },
  {
    id: "EMP006",
    name: "Sunita Devi",
    designation: "Head Clerk",
    department: "Administration",
    grade: "Grade-I",
    joiningDate: "2010-04-12",
    status: "Active",
    phone: "+91 9876543215",
    email: "sunita.devi@gov.in"
  },
  {
    id: "EMP007",
    name: "Vikram Reddy",
    designation: "Lab Technician",
    department: "Health",
    grade: "Grade-III",
    joiningDate: "2020-08-15",
    status: "Active",
    phone: "+91 9876543216",
    email: "vikram.reddy@gov.in"
  },
  {
    id: "EMP008",
    name: "Anita Gupta",
    designation: "Principal",
    department: "Education",
    grade: "Senior Scale",
    joiningDate: "2008-02-01",
    status: "Active",
    phone: "+91 9876543217",
    email: "anita.gupta@gov.in"
  },
];

export function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Employee Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and view all government employees
          </p>
        </div>
        <Link to="/employees/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Transferred">Transferred</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee List ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.grade}</TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                    <TableCell>
                      <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link to={`/employees/${employee.id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
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
