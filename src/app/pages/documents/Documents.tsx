import { useState } from "react";
import { FileText, Upload, Download, Search, Folder, File } from "lucide-react";
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

const stats = [
  { label: "Total Documents", value: "3,456", icon: FileText, color: "text-blue-600" },
  { label: "Uploaded This Month", value: "89", icon: Upload, color: "text-green-600" },
  { label: "Pending Verification", value: "23", icon: File, color: "text-yellow-600" },
  { label: "Document Categories", value: "12", icon: Folder, color: "text-purple-600" },
];

const documentCategories = [
  { name: "Employee Records", count: 2847, icon: FileText },
  { name: "Appointment Letters", count: 2847, icon: FileText },
  { name: "Educational Certificates", count: 3245, icon: FileText },
  { name: "Identity Documents", count: 5694, icon: FileText },
  { name: "Medical Certificates", count: 456, icon: FileText },
  { name: "Leave Applications", count: 1234, icon: FileText },
  { name: "Transfer Orders", count: 156, icon: FileText },
  { name: "Retirement Documents", count: 234, icon: FileText },
  { name: "Salary Slips", count: 34164, icon: FileText },
  { name: "Performance Reviews", count: 2802, icon: FileText },
  { name: "Training Certificates", count: 1234, icon: FileText },
  { name: "Policy Documents", count: 45, icon: FileText },
];

const recentDocuments = [
  {
    id: "DOC001",
    name: "Appointment_Letter_EMP001.pdf",
    category: "Appointment Letters",
    uploadedBy: "Admin User",
    uploadedOn: "2026-02-20",
    size: "245 KB",
    status: "Verified"
  },
  {
    id: "DOC002",
    name: "Medical_Certificate_EMP023.pdf",
    category: "Medical Certificates",
    uploadedBy: "HR Manager",
    uploadedOn: "2026-02-19",
    size: "180 KB",
    status: "Pending"
  },
  {
    id: "DOC003",
    name: "Leave_Application_EMP005.pdf",
    category: "Leave Applications",
    uploadedBy: "Department Head",
    uploadedOn: "2026-02-18",
    size: "95 KB",
    status: "Verified"
  },
  {
    id: "DOC004",
    name: "Transfer_Order_EMP012.pdf",
    category: "Transfer Orders",
    uploadedBy: "Admin User",
    uploadedOn: "2026-02-17",
    size: "320 KB",
    status: "Verified"
  },
];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Document Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and organize all employee documents
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
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

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Document Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.count.toLocaleString()} documents
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document ID</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Uploaded On</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.id}</TableCell>
                        <TableCell className="max-w-xs truncate">{doc.name}</TableCell>
                        <TableCell>{doc.category}</TableCell>
                        <TableCell>{doc.uploadedBy}</TableCell>
                        <TableCell>{doc.uploadedOn}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <Badge variant={doc.status === "Verified" ? "default" : "secondary"}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document ID</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Uploaded On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDocuments
                      .filter(doc => doc.status === "Pending")
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell className="max-w-xs truncate">{doc.name}</TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>{doc.uploadedBy}</TableCell>
                          <TableCell>{doc.uploadedOn}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">Verify</Button>
                              <Button size="sm" variant="ghost">Reject</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
