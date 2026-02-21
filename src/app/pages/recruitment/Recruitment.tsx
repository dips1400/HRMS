import { Users, Briefcase, UserCheck, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
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
  { label: "Active Job Postings", value: "12", icon: Briefcase, color: "text-blue-600" },
  { label: "Total Applications", value: "458", icon: Users, color: "text-green-600" },
  { label: "Shortlisted", value: "89", icon: UserCheck, color: "text-purple-600" },
  { label: "Pending Reviews", value: "234", icon: Clock, color: "text-yellow-600" },
];

const recruitmentPipeline = [
  { stage: "Applications Received", count: 458, percentage: 100 },
  { stage: "Screening", count: 312, percentage: 68 },
  { stage: "Written Test", count: 156, percentage: 34 },
  { stage: "Interview", count: 89, percentage: 19 },
  { stage: "Final Selection", count: 28, percentage: 6 },
];

const recentApplications = [
  {
    id: "APP001",
    applicantName: "Vikram Singh",
    position: "Assistant Engineer",
    department: "Public Works",
    appliedOn: "2026-02-18",
    status: "Shortlisted",
    experience: "3 years"
  },
  {
    id: "APP002",
    applicantName: "Kavita Sharma",
    position: "Staff Nurse",
    department: "Health",
    appliedOn: "2026-02-17",
    status: "Under Review",
    experience: "5 years"
  },
  {
    id: "APP003",
    applicantName: "Rahul Patel",
    position: "Teacher",
    department: "Education",
    appliedOn: "2026-02-16",
    status: "Shortlisted",
    experience: "2 years"
  },
  {
    id: "APP004",
    applicantName: "Anjali Reddy",
    position: "Accountant",
    department: "Finance",
    appliedOn: "2026-02-15",
    status: "Rejected",
    experience: "1 year"
  },
];

export function Recruitment() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Recruitment Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage job postings and candidate applications
          </p>
        </div>
        <Link to="/recruitment/jobs">
          <Button>View All Job Postings</Button>
        </Link>
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

      {/* Recruitment Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recruitmentPipeline.map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-sm text-gray-600">
                    {stage.count} candidates ({stage.percentage}%)
                  </span>
                </div>
                <Progress value={stage.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.id}</TableCell>
                  <TableCell>{application.applicantName}</TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.department}</TableCell>
                  <TableCell>{application.experience}</TableCell>
                  <TableCell>{application.appliedOn}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        application.status === "Shortlisted" ? "default" :
                        application.status === "Rejected" ? "destructive" :
                        "secondary"
                      }
                    >
                      {application.status}
                    </Badge>
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
    </div>
  );
}
