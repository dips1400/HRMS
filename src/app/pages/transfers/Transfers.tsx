import { ArrowRightLeft, MapPin, Clock, CheckCircle } from "lucide-react";
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
import { toast } from "sonner";

const stats = [
  { label: "Pending Transfers", value: "8", icon: Clock, color: "text-yellow-600" },
  { label: "Approved This Month", value: "23", icon: CheckCircle, color: "text-green-600" },
  { label: "In Transit", value: "5", icon: ArrowRightLeft, color: "text-blue-600" },
  { label: "Total This Year", value: "156", icon: MapPin, color: "text-purple-600" },
];

const transferRequests = [
  {
    id: "TR001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    currentDepartment: "Administration",
    currentLocation: "Delhi",
    requestedDepartment: "Finance",
    requestedLocation: "Mumbai",
    reason: "Personal reasons",
    requestDate: "2026-02-15",
    status: "Pending"
  },
  {
    id: "TR002",
    employeeId: "EMP005",
    employeeName: "Suresh Yadav",
    currentDepartment: "Finance",
    currentLocation: "Mumbai",
    requestedDepartment: "Finance",
    requestedLocation: "Bangalore",
    reason: "Family relocation",
    requestDate: "2026-02-12",
    status: "Approved"
  },
  {
    id: "TR003",
    employeeId: "EMP007",
    employeeName: "Vikram Reddy",
    currentDepartment: "Health",
    currentLocation: "Chennai",
    requestedDepartment: "Health",
    requestedLocation: "Hyderabad",
    reason: "Career growth",
    requestDate: "2026-02-10",
    status: "In Transit"
  },
  {
    id: "TR004",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    currentDepartment: "Public Works",
    currentLocation: "Pune",
    requestedDepartment: "Public Works",
    requestedLocation: "Delhi",
    reason: "Personal reasons",
    requestDate: "2026-02-08",
    status: "Rejected"
  },
];

export function Transfers() {
  const handleApprove = (id: string) => {
    toast.success(`Transfer request ${id} approved`);
  };

  const handleReject = (id: string) => {
    toast.error(`Transfer request ${id} rejected`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Transfer Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee transfer requests and postings
          </p>
        </div>
        <Button>Initiate Transfer</Button>
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

      {/* Transfer Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Current Posting</TableHead>
                  <TableHead>Requested Posting</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transferRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.employeeName}</p>
                        <p className="text-sm text-gray-500">{request.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.currentDepartment}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.currentLocation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.requestedDepartment}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {request.requestedLocation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          request.status === "Approved" ? "default" :
                          request.status === "Rejected" ? "destructive" :
                          request.status === "In Transit" ? "default" :
                          "secondary"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === "Pending" ? (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleApprove(request.id)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleReject(request.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost">View</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer Policy Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <p>Employees must complete minimum 2 years at current posting before requesting transfer</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <p>Transfer requests must be submitted 90 days in advance</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <p>Medical and compassionate grounds will be given priority consideration</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <p>All pending work must be handed over before transfer completion</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <p>Transfer orders are subject to administrative approval and departmental requirements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
