import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { toast } from "sonner";

const reportCategories = [
  {
    category: "Employee Reports",
    reports: [
      { name: "Employee Master List", description: "Complete list of all employees with details" },
      { name: "Department-wise Employee Distribution", description: "Employee count by department" },
      { name: "Grade-wise Employee Report", description: "Employees grouped by pay grade" },
      { name: "New Joiners Report", description: "List of employees joined in selected period" },
      { name: "Employee Retirement Report", description: "Upcoming and recent retirements" },
    ]
  },
  {
    category: "Attendance Reports",
    reports: [
      { name: "Monthly Attendance Summary", description: "Attendance statistics for the month" },
      { name: "Department Attendance Report", description: "Attendance by department" },
      { name: "Leave Summary Report", description: "Leave taken by employees" },
      { name: "Late Arrival Report", description: "Employees with late arrivals" },
      { name: "Absenteeism Analysis", description: "Absence patterns and trends" },
    ]
  },
  {
    category: "Payroll Reports",
    reports: [
      { name: "Monthly Salary Register", description: "Complete salary details for the month" },
      { name: "Department-wise Payroll", description: "Payroll breakdown by department" },
      { name: "Tax Deduction Report", description: "Income tax deductions summary" },
      { name: "PF Contribution Report", description: "Provident fund contributions" },
      { name: "Year-to-Date Payroll", description: "Cumulative payroll for the year" },
    ]
  },
  {
    category: "Performance Reports",
    reports: [
      { name: "Performance Review Summary", description: "Overall performance ratings" },
      { name: "Department Performance Report", description: "Performance by department" },
      { name: "Goals Achievement Report", description: "Progress on organizational goals" },
      { name: "Training Effectiveness Report", description: "Impact of training programs" },
    ]
  },
  {
    category: "Recruitment Reports",
    reports: [
      { name: "Vacancy Position Report", description: "Current vacant positions" },
      { name: "Recruitment Pipeline Report", description: "Status of ongoing recruitment" },
      { name: "Application Summary", description: "Summary of applications received" },
      { name: "Time to Hire Report", description: "Average time taken for hiring" },
    ]
  },
];

const stats = [
  { label: "Available Reports", value: "48", icon: FileText, color: "text-blue-600" },
  { label: "Generated This Month", value: "156", icon: TrendingUp, color: "text-green-600" },
  { label: "Scheduled Reports", value: "12", icon: Calendar, color: "text-purple-600" },
  { label: "Downloads", value: "892", icon: Download, color: "text-yellow-600" },
];

export function Reports() {
  const handleGenerateReport = (reportName: string) => {
    toast.success(`Generating ${reportName}...`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Generate and download various HR reports
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

      {/* Quick Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee Master List</SelectItem>
                  <SelectItem value="attendance">Attendance Summary</SelectItem>
                  <SelectItem value="payroll">Salary Register</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Period</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Categories */}
      <Tabs defaultValue="employee" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        {reportCategories.map((category, catIndex) => (
          <TabsContent 
            key={catIndex} 
            value={category.category.toLowerCase().split(' ')[0]}
          >
            <Card>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.reports.map((report, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{report.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleGenerateReport(report.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Reports</CardTitle>
            <Button variant="outline">Schedule New Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Monthly Attendance Summary", frequency: "Monthly", nextRun: "2026-03-01" },
              { name: "Payroll Register", frequency: "Monthly", nextRun: "2026-03-01" },
              { name: "Performance Review Report", frequency: "Quarterly", nextRun: "2026-03-31" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-600">Frequency: {report.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Next Run</p>
                  <p className="font-medium">{report.nextRun}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
