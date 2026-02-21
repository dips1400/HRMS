import { useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Award,
  FileText,
  Edit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export function EmployeeProfile() {
  const { id } = useParams();

  // Mock employee data
  const employee = {
    id: id,
    name: "Rajesh Kumar",
    designation: "Senior Clerk",
    department: "Administration",
    grade: "Grade-II",
    employeeType: "Permanent",
    joiningDate: "2015-03-15",
    status: "Active",
    phone: "+91 9876543210",
    email: "rajesh.kumar@gov.in",
    address: "123, Government Colony, New Delhi - 110001",
    dob: "1985-05-20",
    gender: "Male",
    aadhar: "XXXX-XXXX-1234",
    pan: "ABCDE1234F",
    bankAccount: "1234567890",
    ifsc: "SBIN0001234",
    emergencyContact: "+91 9876543211",
    bloodGroup: "O+",
  };

  const attendanceRecords = [
    { month: "January 2026", present: 22, absent: 0, leave: 2, lateArrival: 1 },
    { month: "December 2025", present: 20, absent: 1, leave: 3, lateArrival: 0 },
    { month: "November 2025", present: 23, absent: 0, leave: 1, lateArrival: 2 },
  ];

  const leaveHistory = [
    { type: "Casual Leave", from: "2026-02-10", to: "2026-02-12", days: 3, status: "Approved" },
    { type: "Sick Leave", from: "2025-12-20", to: "2025-12-22", days: 3, status: "Approved" },
    { type: "Earned Leave", from: "2025-11-15", to: "2025-11-15", days: 1, status: "Approved" },
  ];

  const salaryHistory = [
    { month: "February 2026", basic: 45000, hra: 18000, da: 9000, gross: 72000, deductions: 5000, net: 67000 },
    { month: "January 2026", basic: 45000, hra: 18000, da: 9000, gross: 72000, deductions: 5000, net: 67000 },
  ];

  const trainingRecords = [
    { course: "Digital Governance", duration: "5 days", completedOn: "2025-10-15", certificate: "Yes" },
    { course: "Office Management", duration: "3 days", completedOn: "2025-06-20", certificate: "Yes" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/employees">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Employee Profile</h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete employee information and history
            </p>
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">RK</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{employee.name}</h3>
                  <p className="text-gray-600 mt-1">{employee.designation}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge>{employee.department}</Badge>
                    <Badge variant="secondary">{employee.grade}</Badge>
                    <Badge variant="outline">{employee.employeeType}</Badge>
                    <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                      {employee.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Joined: {employee.joiningDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span>Employee ID: {employee.id}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leave">Leave History</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="mt-1">{employee.dob}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="mt-1">{employee.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Blood Group</label>
                  <p className="mt-1">{employee.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Aadhar Number</label>
                  <p className="mt-1">{employee.aadhar}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">PAN Number</label>
                  <p className="mt-1">{employee.pan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                  <p className="mt-1">{employee.emergencyContact}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="mt-1">{employee.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bank Account</label>
                  <p className="mt-1">{employee.bankAccount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">IFSC Code</label>
                  <p className="mt-1">{employee.ifsc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Leave</TableHead>
                    <TableHead>Late Arrival</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.month}</TableCell>
                      <TableCell className="text-green-600">{record.present}</TableCell>
                      <TableCell className="text-red-600">{record.absent}</TableCell>
                      <TableCell className="text-yellow-600">{record.leave}</TableCell>
                      <TableCell>{record.lateArrival}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveHistory.map((leave, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{leave.type}</TableCell>
                      <TableCell>{leave.from}</TableCell>
                      <TableCell>{leave.to}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>
                        <Badge variant="default">{leave.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Salary History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>HRA</TableHead>
                    <TableHead>DA</TableHead>
                    <TableHead>Gross</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryHistory.map((salary, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{salary.month}</TableCell>
                      <TableCell>₹{salary.basic.toLocaleString()}</TableCell>
                      <TableCell>₹{salary.hra.toLocaleString()}</TableCell>
                      <TableCell>₹{salary.da.toLocaleString()}</TableCell>
                      <TableCell>₹{salary.gross.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">₹{salary.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">₹{salary.net.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Training & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Completed On</TableHead>
                    <TableHead>Certificate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingRecords.map((training, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{training.course}</TableCell>
                      <TableCell>{training.duration}</TableCell>
                      <TableCell>{training.completedOn}</TableCell>
                      <TableCell>
                        <Badge>{training.certificate}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Aadhar Card", "PAN Card", "Educational Certificates", "Appointment Letter", "Bank Passbook", "Photo ID"].map((doc) => (
                  <div key={doc} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
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
