import { useState } from "react";
import { Search, Download, Printer, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const salarySlips = [
  {
    id: "SS001",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    department: "Administration",
    month: "February 2026",
    basic: 45000,
    hra: 18000,
    da: 9000,
    medical: 1500,
    transport: 3000,
    gross: 76500,
    pf: 5400,
    tax: 3000,
    other: 600,
    deductions: 9000,
    netPay: 67500
  },
  {
    id: "SS002",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    department: "Public Works",
    month: "February 2026",
    basic: 55000,
    hra: 22000,
    da: 11000,
    medical: 1500,
    transport: 3000,
    gross: 92500,
    pf: 6600,
    tax: 5500,
    other: 400,
    deductions: 12500,
    netPay: 80000
  },
];

export function SalarySlips() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("february-2026");
  const [selectedSlip, setSelectedSlip] = useState<typeof salarySlips[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const viewSlip = (slip: typeof salarySlips[0]) => {
    setSelectedSlip(slip);
    setDialogOpen(true);
  };

  const printSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Salary Slips</h2>
        <p className="text-sm text-gray-500 mt-1">
          View and download employee salary slips
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by employee name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="february-2026">February 2026</SelectItem>
                <SelectItem value="january-2026">January 2026</SelectItem>
                <SelectItem value="december-2025">December 2025</SelectItem>
                <SelectItem value="november-2025">November 2025</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Salary Slips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Slips List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slip ID</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Gross Pay</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salarySlips.map((slip) => (
                  <TableRow key={slip.id}>
                    <TableCell className="font-medium">{slip.id}</TableCell>
                    <TableCell>{slip.employeeId}</TableCell>
                    <TableCell>{slip.employeeName}</TableCell>
                    <TableCell>{slip.department}</TableCell>
                    <TableCell>{slip.month}</TableCell>
                    <TableCell>₹{slip.gross.toLocaleString()}</TableCell>
                    <TableCell className="text-red-600">₹{slip.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">₹{slip.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => viewSlip(slip)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
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

      {/* Salary Slip Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Salary Slip Details</DialogTitle>
          </DialogHeader>
          {selectedSlip && (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b pb-4">
                <h3 className="text-xl font-semibold">Government of India</h3>
                <p className="text-sm text-gray-600 mt-1">Salary Slip</p>
                <p className="text-sm text-gray-600">{selectedSlip.month}</p>
              </div>

              {/* Employee Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Employee Name:</p>
                  <p className="font-medium">{selectedSlip.employeeName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Employee ID:</p>
                  <p className="font-medium">{selectedSlip.employeeId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Department:</p>
                  <p className="font-medium">{selectedSlip.department}</p>
                </div>
                <div>
                  <p className="text-gray-600">Slip ID:</p>
                  <p className="font-medium">{selectedSlip.id}</p>
                </div>
              </div>

              {/* Salary Breakdown */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Earnings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span>₹{selectedSlip.basic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HRA</span>
                      <span>₹{selectedSlip.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DA</span>
                      <span>₹{selectedSlip.da.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medical Allowance</span>
                      <span>₹{selectedSlip.medical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Allowance</span>
                      <span>₹{selectedSlip.transport.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Gross Salary</span>
                      <span>₹{selectedSlip.gross.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-red-700">Deductions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Provident Fund</span>
                      <span>₹{selectedSlip.pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Tax</span>
                      <span>₹{selectedSlip.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Deductions</span>
                      <span>₹{selectedSlip.other.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2 mt-16">
                      <span>Total Deductions</span>
                      <span>₹{selectedSlip.deductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Net Pay</span>
                  <span className="text-2xl font-bold text-blue-700">
                    ₹{selectedSlip.netPay.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={printSlip}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
