import { UserCheck, Calendar, DollarSign, FileText } from "lucide-react";
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
import { Progress } from "../../components/ui/progress";

const stats = [
  { label: "Retiring This Year", value: "45", icon: UserCheck, color: "text-blue-600" },
  { label: "Pending Clearances", value: "5", icon: FileText, color: "text-yellow-600" },
  { label: "Pension Processed", value: "234", icon: DollarSign, color: "text-green-600" },
  { label: "Upcoming (6 months)", value: "12", icon: Calendar, color: "text-purple-600" },
];

const upcomingRetirements = [
  {
    employeeId: "EMP012",
    employeeName: "Mohan Lal Sharma",
    department: "Administration",
    designation: "Senior Clerk",
    joiningDate: "1986-03-15",
    retirementDate: "2026-03-15",
    daysLeft: 22,
    pensionStatus: "Processing",
    clearanceStatus: 75
  },
  {
    employeeId: "EMP024",
    employeeName: "Sushila Devi",
    department: "Education",
    designation: "Principal",
    joiningDate: "1984-07-01",
    retirementDate: "2026-07-01",
    daysLeft: 130,
    pensionStatus: "Not Started",
    clearanceStatus: 0
  },
  {
    employeeId: "EMP018",
    employeeName: "Ram Prasad Gupta",
    department: "Health",
    designation: "Medical Officer",
    joiningDate: "1985-11-20",
    retirementDate: "2026-05-20",
    daysLeft: 88,
    pensionStatus: "Under Review",
    clearanceStatus: 40
  },
];

const recentRetirements = [
  {
    employeeId: "EMP008",
    employeeName: "Krishna Kumar",
    department: "Finance",
    retiredOn: "2026-01-31",
    serviceYears: 40,
    pensionAmount: "₹35,000",
    status: "Completed"
  },
  {
    employeeId: "EMP015",
    employeeName: "Radha Devi",
    department: "Administration",
    retiredOn: "2026-01-15",
    serviceYears: 38,
    pensionAmount: "₹32,000",
    status: "Completed"
  },
];

const clearanceChecklist = [
  { item: "No Dues Certificate", description: "Finance clearance" },
  { item: "Hand Over Report", description: "Complete work handover" },
  { item: "Asset Return", description: "Return all government assets" },
  { item: "Medical Clearance", description: "Final health checkup" },
  { item: "Pension Documents", description: "Submit pension papers" },
  { item: "Service Book Verification", description: "Verify service records" },
];

export function Retirement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Retirement Management</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee retirements and pension processing
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

      {/* Upcoming Retirements */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Retirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Retirement Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Clearance</TableHead>
                  <TableHead>Pension Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingRetirements.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell className="font-medium">{employee.employeeId}</TableCell>
                    <TableCell>{employee.employeeName}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.joiningDate}</TableCell>
                    <TableCell>{employee.retirementDate}</TableCell>
                    <TableCell>
                      <Badge variant={employee.daysLeft < 30 ? "destructive" : "secondary"}>
                        {employee.daysLeft} days
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 w-24">
                        <div className="text-sm">{employee.clearanceStatus}%</div>
                        <Progress value={employee.clearanceStatus} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          employee.pensionStatus === "Processing" ? "default" :
                          employee.pensionStatus === "Under Review" ? "secondary" :
                          "outline"
                        }
                      >
                        {employee.pensionStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Retirements */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Retired Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Retired On</TableHead>
                <TableHead>Service Years</TableHead>
                <TableHead>Monthly Pension</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRetirements.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell className="font-medium">{employee.employeeId}</TableCell>
                  <TableCell>{employee.employeeName}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.retiredOn}</TableCell>
                  <TableCell>{employee.serviceYears} years</TableCell>
                  <TableCell className="font-semibold">{employee.pensionAmount}</TableCell>
                  <TableCell>
                    <Badge variant="default">{employee.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clearance Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Retirement Clearance Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clearanceChecklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
