import { GraduationCap, Users, Award, BookOpen } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

const stats = [
  { label: "Active Programs", value: "24", icon: GraduationCap, color: "text-blue-600" },
  { label: "Enrolled Employees", value: "456", icon: Users, color: "text-green-600" },
  { label: "Completed Trainings", value: "1,234", icon: Award, color: "text-purple-600" },
  { label: "Ongoing Sessions", value: "8", icon: BookOpen, color: "text-yellow-600" },
];

const trainingPrograms = [
  {
    id: "TRN001",
    name: "Digital Governance & E-Administration",
    category: "Technology",
    duration: "5 days",
    startDate: "2026-03-01",
    endDate: "2026-03-05",
    capacity: 50,
    enrolled: 45,
    status: "Upcoming"
  },
  {
    id: "TRN002",
    name: "Leadership Development Program",
    category: "Leadership",
    duration: "10 days",
    startDate: "2026-02-20",
    endDate: "2026-03-01",
    capacity: 30,
    enrolled: 28,
    status: "Ongoing"
  },
  {
    id: "TRN003",
    name: "Financial Management & Budgeting",
    category: "Finance",
    duration: "3 days",
    startDate: "2026-02-15",
    endDate: "2026-02-17",
    capacity: 40,
    enrolled: 40,
    status: "Completed"
  },
  {
    id: "TRN004",
    name: "Public Health & Safety Protocols",
    category: "Health",
    duration: "7 days",
    startDate: "2026-03-10",
    endDate: "2026-03-16",
    capacity: 60,
    enrolled: 52,
    status: "Upcoming"
  },
];

const enrolledEmployees = [
  {
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    department: "Administration",
    training: "Digital Governance",
    enrolledOn: "2026-02-15",
    progress: 60,
    status: "In Progress"
  },
  {
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    department: "Education",
    training: "Leadership Development",
    enrolledOn: "2026-02-10",
    progress: 100,
    status: "Completed"
  },
  {
    employeeId: "EMP004",
    employeeName: "Neha Patel",
    department: "Health",
    training: "Public Health Protocols",
    enrolledOn: "2026-02-18",
    progress: 30,
    status: "In Progress"
  },
];

const certifications = [
  {
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    certification: "Leadership Development",
    issuedOn: "2026-02-15",
    validUntil: "2029-02-15",
    certificateId: "CERT001"
  },
  {
    employeeId: "EMP006",
    employeeName: "Sunita Devi",
    certification: "Financial Management",
    issuedOn: "2026-02-10",
    validUntil: "2029-02-10",
    certificateId: "CERT002"
  },
];

export function Training() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Training & Development</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage training programs and employee development
          </p>
        </div>
        <Button>Create Training Program</Button>
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

      {/* Tabs */}
      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs">Training Programs</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="programs">
          <Card>
            <CardHeader>
              <CardTitle>All Training Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program ID</TableHead>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.id}</TableCell>
                        <TableCell>{program.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{program.category}</Badge>
                        </TableCell>
                        <TableCell>{program.duration}</TableCell>
                        <TableCell>{program.startDate}</TableCell>
                        <TableCell>{program.endDate}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {program.enrolled} / {program.capacity}
                            </div>
                            <Progress value={(program.enrolled / program.capacity) * 100} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              program.status === "Ongoing" ? "default" :
                              program.status === "Upcoming" ? "secondary" :
                              "outline"
                            }
                          >
                            {program.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollments">
          <Card>
            <CardHeader>
              <CardTitle>Employee Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Training Program</TableHead>
                    <TableHead>Enrolled On</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledEmployees.map((enrollment) => (
                    <TableRow key={enrollment.employeeId}>
                      <TableCell className="font-medium">{enrollment.employeeId}</TableCell>
                      <TableCell>{enrollment.employeeName}</TableCell>
                      <TableCell>{enrollment.department}</TableCell>
                      <TableCell>{enrollment.training}</TableCell>
                      <TableCell>{enrollment.enrolledOn}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={enrollment.status === "Completed" ? "default" : "secondary"}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Issued Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Issued On</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certifications.map((cert) => (
                    <TableRow key={cert.certificateId}>
                      <TableCell className="font-medium">{cert.certificateId}</TableCell>
                      <TableCell>{cert.employeeId}</TableCell>
                      <TableCell>{cert.employeeName}</TableCell>
                      <TableCell>{cert.certification}</TableCell>
                      <TableCell>{cert.issuedOn}</TableCell>
                      <TableCell>{cert.validUntil}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
