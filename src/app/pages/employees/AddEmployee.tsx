import { Link } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
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

export function AddEmployee() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Employee added successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/employees">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Add New Employee</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter employee details to add them to the system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" placeholder="Enter first name" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" placeholder="Enter last name" required />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" required />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="employee@gov.in" required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" placeholder="+91 9876543210" required />
              </div>
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" type="tel" placeholder="+91 9876543210" />
              </div>
              <div>
                <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                <Input id="emergencyName" placeholder="Contact person name" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" placeholder="Enter complete address" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input id="employeeId" placeholder="EMP001" required />
              </div>
              <div>
                <Label htmlFor="joiningDate">Joining Date *</Label>
                <Input id="joiningDate" type="date" required />
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
                <Label htmlFor="designation">Designation *</Label>
                <Input id="designation" placeholder="Enter designation" required />
              </div>
              <div>
                <Label htmlFor="grade">Grade/Pay Scale *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-i">Grade-I</SelectItem>
                    <SelectItem value="grade-ii">Grade-II</SelectItem>
                    <SelectItem value="grade-iii">Grade-III</SelectItem>
                    <SelectItem value="senior-scale">Senior Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="contractual">Contractual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reportingOfficer">Reporting Officer</Label>
                <Input id="reportingOfficer" placeholder="Enter officer name" />
              </div>
              <div>
                <Label htmlFor="workLocation">Work Location</Label>
                <Input id="workLocation" placeholder="Enter location" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity & Bank Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Identity & Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="aadhar">Aadhar Number *</Label>
                <Input id="aadhar" placeholder="XXXX-XXXX-XXXX" required />
              </div>
              <div>
                <Label htmlFor="pan">PAN Number *</Label>
                <Input id="pan" placeholder="ABCDE1234F" required />
              </div>
              <div>
                <Label htmlFor="bankAccount">Bank Account Number *</Label>
                <Input id="bankAccount" placeholder="Enter account number" required />
              </div>
              <div>
                <Label htmlFor="ifsc">IFSC Code *</Label>
                <Input id="ifsc" placeholder="SBIN0001234" required />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Enter bank name" />
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input id="branch" placeholder="Enter branch name" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Qualifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Educational Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="highestQualification">Highest Qualification *</Label>
                <Input id="highestQualification" placeholder="e.g., B.Tech, M.A." required />
              </div>
              <div>
                <Label htmlFor="university">University/Board</Label>
                <Input id="university" placeholder="Enter university name" />
              </div>
              <div>
                <Label htmlFor="yearOfPassing">Year of Passing</Label>
                <Input id="yearOfPassing" type="number" placeholder="2020" />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="Enter specialization" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link to="/employees">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Employee
          </Button>
        </div>
      </form>
    </div>
  );
}
