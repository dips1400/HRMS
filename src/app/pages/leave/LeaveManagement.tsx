import { useState } from "react";
import { Search, Filter, Plus, CheckCircle, XCircle, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
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

const leaveStats = [
  { label: "Pending Requests", value: "23", icon: Clock, color: "text-yellow-600" },
  { label: "Approved This Month", value: "156", icon: CheckCircle, color: "text-green-600" },
  { label: "Rejected", value: "8", icon: XCircle, color: "text-red-600" },
  { label: "On Leave Today", value: "143", icon: Clock, color: "text-blue-600" },
];

const leaveRequests = [
  {
    id: "LR001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    department: "Administration",
    leaveType: "Casual Leave",
    fromDate: "2026-02-25",
    toDate: "2026-02-27",
    days: 3,
    reason: "Personal work",
    status: "Pending",
    appliedOn: "2026-02-20"
  },
  {
    id: "LR002",
    employeeId: "EMP003",
    employeeName: "Amit Singh",
    department: "Education",
    leaveType: "Sick Leave",
    fromDate: "2026-02-21",
    toDate: "2026-02-23",
    days: 3,
    reason: "Medical checkup",
    status: "Approved",
    appliedOn: "2026-02-19"
  },
  {
    id: "LR003",
    employeeId: "EMP005",
    employeeName: "Suresh Yadav",
    department: "Finance",
    leaveType: "Earned Leave",
    fromDate: "2026-03-01",
    toDate: "2026-03-05",
    days: 5,
    reason: "Family function",
    status: "Pending",
    appliedOn: "2026-02-18"
  },
  {
    id: "LR004",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    department: "Public Works",
    leaveType: "Casual Leave",
    fromDate: "2026-02-15",
    toDate: "2026-02-15",
    days: 1,
    reason: "Personal work",
    status: "Rejected",
    appliedOn: "2026-02-14"
  },
];

const leaveBalance = [
  { type: "Casual Leave", total: 12, used: 4, remaining: 8 },
  { type: "Sick Leave", total: 12, used: 2, remaining: 10 },
  { type: "Earned Leave", total: 30, used: 8, remaining: 22 },
  { type: "Maternity Leave", total: 180, used: 0, remaining: 180 },
];

export function LeaveManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleApprove = (id: string) => {
    toast.success(`Leave request ${id} approved`);
  };

  const handleReject = (id: string) => {
    toast.error(`Leave request ${id} rejected`);
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Leave application submitted successfully");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Leave Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee leave requests and balances
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Fill in the details to apply for leave
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <Label htmlFor="leaveType">Leave Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="earned">Earned Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromDate">From Date *</Label>
                  <Input id="fromDate" type="date" required />
                </div>
                <div>
                  <Label htmlFor="toDate">To Date *</Label>
                  <Input id="toDate" type="date" required />
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Reason *</Label>
                <Textarea id="reason" placeholder="Enter reason for leave" required />
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
        {leaveStats.map((stat) => {
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
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>From - To</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.employeeName}</p>
                            <p className="text-sm text-gray-500">{request.employeeId}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.department}</TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{request.fromDate}</p>
                            <p className="text-gray-500">{request.toDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              request.status === "Approved" ? "default" :
                              request.status === "Rejected" ? "destructive" :
                              "secondary"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === "Pending" && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleReject(request.id)}
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leaveBalance.map((leave, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{leave.type}</span>
                      <span className="text-sm text-gray-500">
                        {leave.remaining} of {leave.total} remaining
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(leave.remaining / leave.total) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Used: {leave.used}</span>
                      <span>Remaining: {leave.remaining}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Leave calendar view - Shows upcoming holidays and leave schedules</p>
                <p className="text-sm mt-2">Feature coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
