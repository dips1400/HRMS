import { useState } from "react";
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Plus } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "sonner";

const stats = [
  { label: "Total Grievances", value: "156", icon: MessageSquare, color: "text-blue-600" },
  { label: "Pending", value: "12", icon: Clock, color: "text-yellow-600" },
  { label: "Resolved", value: "132", icon: CheckCircle, color: "text-green-600" },
  { label: "Critical", value: "3", icon: AlertTriangle, color: "text-red-600" },
];

const grievances = [
  {
    id: "GRV001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    department: "Administration",
    category: "Salary Issues",
    subject: "Incorrect HRA calculation",
    description: "My HRA is being calculated incorrectly for the last 3 months",
    submittedOn: "2026-02-18",
    priority: "High",
    status: "In Progress",
    assignedTo: "Finance Head"
  },
  {
    id: "GRV002",
    employeeId: "EMP005",
    employeeName: "Suresh Yadav",
    department: "Finance",
    category: "Leave Issues",
    subject: "Leave not credited",
    description: "My earned leave balance is not updated for this year",
    submittedOn: "2026-02-15",
    priority: "Medium",
    status: "Pending",
    assignedTo: "HR Manager"
  },
  {
    id: "GRV003",
    employeeId: "EMP007",
    employeeName: "Vikram Reddy",
    department: "Health",
    category: "Transfer Issues",
    subject: "Transfer request not processed",
    description: "My transfer request submitted 2 months ago is still pending",
    submittedOn: "2026-02-12",
    priority: "High",
    status: "In Progress",
    assignedTo: "Admin Head"
  },
  {
    id: "GRV004",
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    department: "Education",
    category: "Workplace Issues",
    subject: "Infrastructure concerns",
    description: "Classroom needs repair and maintenance",
    submittedOn: "2026-02-10",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Public Works"
  },
];

export function Grievances() {
  const [open, setOpen] = useState(false);

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Grievance submitted successfully!");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Grievance Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track and resolve employee grievances
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Submit Grievance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Grievance</DialogTitle>
              <DialogDescription>
                Describe your grievance and we'll address it promptly
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitGrievance} className="space-y-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary Issues</SelectItem>
                    <SelectItem value="leave">Leave Issues</SelectItem>
                    <SelectItem value="transfer">Transfer Issues</SelectItem>
                    <SelectItem value="workplace">Workplace Issues</SelectItem>
                    <SelectItem value="harassment">Harassment</SelectItem>
                    <SelectItem value="discrimination">Discrimination</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Brief subject of grievance" required />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed description of your grievance" 
                  rows={5}
                  required 
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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

      {/* Grievances Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Grievances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grievance ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grievances.map((grievance) => (
                  <TableRow key={grievance.id}>
                    <TableCell className="font-medium">{grievance.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{grievance.employeeName}</p>
                        <p className="text-sm text-gray-500">{grievance.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{grievance.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{grievance.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{grievance.subject}</TableCell>
                    <TableCell>{grievance.submittedOn}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          grievance.priority === "Critical" ? "destructive" :
                          grievance.priority === "High" ? "destructive" :
                          grievance.priority === "Medium" ? "default" :
                          "secondary"
                        }
                      >
                        {grievance.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{grievance.assignedTo}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          grievance.status === "Resolved" ? "default" :
                          grievance.status === "In Progress" ? "secondary" :
                          "outline"
                        }
                      >
                        {grievance.status}
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

      {/* Grievance Resolution Process */}
      <Card>
        <CardHeader>
          <CardTitle>Grievance Resolution Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: "1", title: "Submission", description: "Employee submits grievance through the system" },
              { step: "2", title: "Acknowledgment", description: "System generates ticket and sends confirmation within 24 hours" },
              { step: "3", title: "Assignment", description: "Grievance assigned to appropriate authority based on category" },
              { step: "4", title: "Investigation", description: "Assigned authority reviews and investigates the matter" },
              { step: "5", title: "Resolution", description: "Issue resolved and employee is notified" },
              { step: "6", title: "Closure", description: "Feedback collected and case closed" },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-medium">{item.title}</h4>
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
