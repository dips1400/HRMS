import { Link } from "react-router"
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"

const stats = [
  {
    label: "Active Pay Scales",
    value: "12",
    icon: DollarSign,
    color: "text-blue-600",
  },
  {
    label: "Pay Matrices",
    value: "7",
    icon: Calculator,
    color: "text-green-600",
  },
  {
    label: "Grade Levels",
    value: "24",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

const payScales = [
  {
    id: "PS001",
    name: "7th Pay Commission - Level 1",
    level: "Level-1",
    minPay: 18000,
    maxPay: 56900,
    increment: 3,
    employees: 245,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
  {
    id: "PS002",
    name: "7th Pay Commission - Level 2",
    level: "Level-2",
    minPay: 19900,
    maxPay: 63200,
    increment: 3,
    employees: 387,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
  {
    id: "PS003",
    name: "7th Pay Commission - Level 3",
    level: "Level-3",
    minPay: 21700,
    maxPay: 69100,
    increment: 3,
    employees: 423,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
  {
    id: "PS004",
    name: "7th Pay Commission - Level 4",
    level: "Level-4",
    minPay: 25500,
    maxPay: 81100,
    increment: 3,
    employees: 512,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
  {
    id: "PS005",
    name: "7th Pay Commission - Level 5",
    level: "Level-5",
    minPay: 29200,
    maxPay: 92300,
    increment: 3,
    employees: 356,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
  {
    id: "PS006",
    name: "7th Pay Commission - Level 6",
    level: "Level-6",
    minPay: 35400,
    maxPay: 112400,
    increment: 3,
    employees: 289,
    effectiveFrom: "2016-01-01",
    status: "Active",
  },
]

const gradePay = [
  { level: "Level-1", gradePay: 1800, basicPay: "18000-56900" },
  { level: "Level-2", gradePay: 1900, basicPay: "19900-63200" },
  { level: "Level-3", gradePay: 2000, basicPay: "21700-69100" },
  { level: "Level-4", gradePay: 2400, basicPay: "25500-81100" },
  { level: "Level-5", gradePay: 2800, basicPay: "29200-92300" },
  { level: "Level-6", gradePay: 4200, basicPay: "35400-112400" },
  { level: "Level-7", gradePay: 4400, basicPay: "44900-142400" },
  { level: "Level-8", gradePay: 4600, basicPay: "47600-151100" },
  { level: "Level-9", gradePay: 4800, basicPay: "53100-167800" },
  { level: "Level-10", gradePay: 5400, basicPay: "56100-177500" },
]

const payMatrix = [
  { level: 1, stage1: 18000, stage10: 22200, stage20: 28100, stage40: 56900 },
  { level: 2, stage1: 19900, stage10: 24600, stage20: 31000, stage40: 63200 },
  { level: 3, stage1: 21700, stage10: 26800, stage20: 33800, stage40: 69100 },
  { level: 4, stage1: 25500, stage10: 31500, stage20: 39800, stage40: 81100 },
  { level: 5, stage1: 29200, stage10: 36000, stage20: 45400, stage40: 92300 },
  { level: 6, stage1: 35400, stage10: 43700, stage20: 55200, stage40: 112400 },
]

export function PayScaleManagement() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Pay Scale & Calculations
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage pay scales, grade pay, and salary calculations as per
            government norms
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/payscale/tedious">
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Tedious Calculations
            </Button>
          </Link>
          <Link to="/payscale/allowance">
            <Button variant="outline">Allowance Calculator</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
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
          )
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="scales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scales">Pay Scales</TabsTrigger>
          <TabsTrigger value="grade">Grade Pay</TabsTrigger>
          <TabsTrigger value="matrix">Pay Matrix</TabsTrigger>
          <TabsTrigger value="increments">Increment Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="scales">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Pay Scales (7th Pay Commission)</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pay Scale
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pay Scale ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Minimum Pay</TableHead>
                      <TableHead>Maximum Pay</TableHead>
                      <TableHead>Increment %</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Effective From</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payScales.map((scale) => (
                      <TableRow key={scale.id}>
                        <TableCell className="font-medium">
                          {scale.id}
                        </TableCell>
                        <TableCell>{scale.name}</TableCell>
                        <TableCell>
                          <Badge>{scale.level}</Badge>
                        </TableCell>
                        <TableCell>₹{scale.minPay.toLocaleString()}</TableCell>
                        <TableCell>₹{scale.maxPay.toLocaleString()}</TableCell>
                        <TableCell>{scale.increment}%</TableCell>
                        <TableCell>{scale.employees}</TableCell>
                        <TableCell>{scale.effectiveFrom}</TableCell>
                        <TableCell>
                          <Badge variant="default">{scale.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
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
        </TabsContent>

        <TabsContent value="grade">
          <Card>
            <CardHeader>
              <CardTitle>Grade Pay Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>Grade Pay</TableHead>
                      <TableHead>Basic Pay Range</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradePay.map((grade, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">{grade.level}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{grade.gradePay.toLocaleString()}
                        </TableCell>
                        <TableCell>₹{grade.basicPay}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>Pay Matrix - Stage-wise Basic Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>Stage 1 (Entry)</TableHead>
                      <TableHead>Stage 10</TableHead>
                      <TableHead>Stage 20</TableHead>
                      <TableHead>Stage 40 (Max)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payMatrix.map((matrix) => (
                      <TableRow key={matrix.level}>
                        <TableCell className="font-medium">
                          <Badge>Level-{matrix.level}</Badge>
                        </TableCell>
                        <TableCell>₹{matrix.stage1.toLocaleString()}</TableCell>
                        <TableCell>
                          ₹{matrix.stage10.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ₹{matrix.stage20.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ₹{matrix.stage40.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            View Full Matrix
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Pay Matrix shows basic pay progression
                  across different stages. Each level has 40 stages with annual
                  increments of 3%.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="increments">
          <Card>
            <CardHeader>
              <CardTitle>Annual Increment Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Standard Increment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Percentage:</span>
                      <span className="font-medium">3% of Basic Pay</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">Annual (July 1st)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calculation:</span>
                      <span className="font-medium">Move to Next Stage</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Performance Increment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Percentage:</span>
                      <span className="font-medium">Additional 1-2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Criteria:</span>
                      <span className="font-medium">
                        Outstanding Performance
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approval:</span>
                      <span className="font-medium">Department Head</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Stagnation Increment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">Reached Maximum Stage</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Benefit:</span>
                      <span className="font-medium">
                        2 Additional Increments
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">At:</span>
                      <span className="font-medium">2 & 4 Years after Max</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Promotion Increment</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">On Promotion:</span>
                      <span className="font-medium">Move to Higher Level</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fixation:</span>
                      <span className="font-medium">
                        Next Stage Above Current
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Increase:</span>
                      <span className="font-medium">₹500-₹2000</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-yellow-800">
                  Withheld Increment Cases
                </h4>
                <div className="space-y-2 text-sm text-yellow-800">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5" />
                    <p>Pending disciplinary proceedings</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5" />
                    <p>Below satisfactory performance rating</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5" />
                    <p>Under suspension from service</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
