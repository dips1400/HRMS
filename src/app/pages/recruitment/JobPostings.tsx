import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

const jobPostings = [
  {
    id: "JOB001",
    title: "Assistant Engineer",
    department: "Public Works",
    positions: 5,
    qualifications: "B.Tech in Civil Engineering",
    experience: "2-5 years",
    postedOn: "2026-02-10",
    closingDate: "2026-03-10",
    applications: 89,
    status: "Active"
  },
  {
    id: "JOB002",
    title: "Staff Nurse",
    department: "Health",
    positions: 10,
    qualifications: "B.Sc Nursing or GNM",
    experience: "1-3 years",
    postedOn: "2026-02-08",
    closingDate: "2026-03-08",
    applications: 156,
    status: "Active"
  },
  {
    id: "JOB003",
    title: "Primary Teacher",
    department: "Education",
    positions: 15,
    qualifications: "B.Ed with relevant subject",
    experience: "0-2 years",
    postedOn: "2026-02-05",
    closingDate: "2026-03-05",
    applications: 234,
    status: "Active"
  },
  {
    id: "JOB004",
    title: "Accountant",
    department: "Finance",
    positions: 3,
    qualifications: "B.Com with CA/ICWA",
    experience: "3-7 years",
    postedOn: "2026-01-25",
    closingDate: "2026-02-25",
    applications: 67,
    status: "Closed"
  },
];

export function JobPostings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Job posting created successfully!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Job Postings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage job postings for recruitment
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new job posting
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input id="jobTitle" placeholder="Enter job title" required />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="public-works">Public Works</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="positions">Number of Positions *</Label>
                  <Input id="positions" type="number" placeholder="5" required />
                </div>
                <div>
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input id="experience" placeholder="e.g., 2-5 years" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="qualifications">Qualifications *</Label>
                  <Textarea id="qualifications" placeholder="Enter required qualifications" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea id="description" placeholder="Enter job description" required />
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g., ₹40,000 - ₹60,000" />
                </div>
                <div>
                  <Label htmlFor="closingDate">Application Closing Date *</Label>
                  <Input id="closingDate" type="date" required />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Posting</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search job postings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Job Postings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Positions</TableHead>
                  <TableHead>Qualifications</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead>Closing Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobPostings.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.positions}</TableCell>
                    <TableCell className="max-w-xs truncate">{job.qualifications}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{job.applications}</Badge>
                    </TableCell>
                    <TableCell>{job.postedOn}</TableCell>
                    <TableCell>{job.closingDate}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
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
