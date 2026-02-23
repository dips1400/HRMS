import { useState } from "react"
import { Calculator, ArrowLeft, Plus, Minus } from "lucide-react"
import { Link } from "react-router"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Badge } from "../../components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { toast } from "sonner"

const allowanceTypes = [
  {
    category: "Location Based",
    allowances: [
      {
        name: "HRA (House Rent Allowance)",
        description: "Based on city classification",
        formula: "24%/16%/8% of Basic Pay",
        taxable: true,
      },
      {
        name: "City Compensatory Allowance",
        description: "For metro cities",
        formula: "Fixed: ₹600-₹1,350",
        taxable: true,
      },
      {
        name: "Hill Area Allowance",
        description: "For hilly regions",
        formula: "₹300-₹1,060 per month",
        taxable: false,
      },
    ],
  },
  {
    category: "Travel & Transport",
    allowances: [
      {
        name: "Transport Allowance",
        description: "Daily commute",
        formula: "₹1,800-₹7,200 per month",
        taxable: false,
      },
      {
        name: "Conveyance Allowance",
        description: "Official travel",
        formula: "As per actual bills",
        taxable: false,
      },
      {
        name: "Daily Allowance (TA/DA)",
        description: "Official tours",
        formula: "₹800-₹3,000 per day",
        taxable: false,
      },
    ],
  },
  {
    category: "Family & Welfare",
    allowances: [
      {
        name: "Children Education Allowance",
        description: "For children's education",
        formula: "₹2,250 per child (max 2)",
        taxable: false,
      },
      {
        name: "Hostel Subsidy",
        description: "If child in hostel",
        formula: "₹6,750 per child",
        taxable: false,
      },
      {
        name: "Family Planning Allowance",
        description: "For family planning",
        formula: "Fixed amount",
        taxable: false,
      },
    ],
  },
  {
    category: "Medical & Health",
    allowances: [
      {
        name: "Medical Allowance",
        description: "Monthly medical expenses",
        formula: "₹1,000 per month",
        taxable: true,
      },
      {
        name: "CGHS Contribution",
        description: "Health scheme",
        formula: "Based on pay level",
        taxable: false,
      },
    ],
  },
  {
    category: "Special Allowances",
    allowances: [
      {
        name: "Washing Allowance",
        description: "Uniform maintenance",
        formula: "₹300-₹600 per month",
        taxable: false,
      },
      {
        name: "Outfit Allowance",
        description: "For uniform procurement",
        formula: "₹5,000 annually",
        taxable: false,
      },
      {
        name: "Special Duty Allowance",
        description: "For special assignments",
        formula: "20% of Basic Pay",
        taxable: true,
      },
      {
        name: "Overtime Allowance",
        description: "Extra working hours",
        formula: "Per hour rate × hours",
        taxable: true,
      },
    ],
  },
]

export function AllowanceCalculator() {
  const [basicPay, setBasicPay] = useState("45000")
  const [selectedAllowances, setSelectedAllowances] = useState<string[]>([])
  const [customAllowances, setCustomAllowances] = useState<any[]>([])
  const [calculationResult, setCalculationResult] = useState<any>(null)

  // Calculator States
  const [cityType, setCityType] = useState("x")
  const [childrenCount, setChildrenCount] = useState("0")
  const [hostelChildren, setHostelChildren] = useState("0")
  const [specialDuty, setSpecialDuty] = useState(false)
  const [hillArea, setHillArea] = useState(false)

  const handleCalculate = () => {
    const basic = parseFloat(basicPay)
    let totalAllowances = 0
    let taxableAllowances = 0
    const breakdown: any[] = []

    // HRA
    let hraPercent = cityType === "x" ? 24 : cityType === "y" ? 16 : 8
    const hra = (basic * hraPercent) / 100
    totalAllowances += hra
    taxableAllowances += hra
    breakdown.push({ name: "HRA", amount: hra, taxable: true })

    // Transport
    const transport = cityType === "x" ? 7200 : cityType === "y" ? 3600 : 1800
    totalAllowances += transport
    breakdown.push({
      name: "Transport Allowance",
      amount: transport,
      taxable: false,
    })

    // Medical
    const medical = 1000
    totalAllowances += medical
    taxableAllowances += medical
    breakdown.push({
      name: "Medical Allowance",
      amount: medical,
      taxable: true,
    })

    // Children Education
    const children = parseInt(childrenCount) || 0
    if (children > 0) {
      const cea = Math.min(children, 2) * 2250
      totalAllowances += cea
      breakdown.push({
        name: "Children Education Allowance",
        amount: cea,
        taxable: false,
      })
    }

    // Hostel Subsidy
    const hostel = parseInt(hostelChildren) || 0
    if (hostel > 0) {
      const hostelAmount = Math.min(hostel, 2) * 6750
      totalAllowances += hostelAmount
      breakdown.push({
        name: "Hostel Subsidy",
        amount: hostelAmount,
        taxable: false,
      })
    }

    // Washing Allowance
    const washing = 300
    totalAllowances += washing
    breakdown.push({
      name: "Washing Allowance",
      amount: washing,
      taxable: false,
    })

    // Special Duty Allowance
    if (specialDuty) {
      const specialAmount = basic * 0.2
      totalAllowances += specialAmount
      taxableAllowances += specialAmount
      breakdown.push({
        name: "Special Duty Allowance",
        amount: specialAmount,
        taxable: true,
      })
    }

    // Hill Area Allowance
    if (hillArea) {
      const hillAmount = 1060
      totalAllowances += hillAmount
      breakdown.push({
        name: "Hill Area Allowance",
        amount: hillAmount,
        taxable: false,
      })
    }

    // City Compensatory
    if (cityType === "x") {
      const cca = 1350
      totalAllowances += cca
      taxableAllowances += cca
      breakdown.push({
        name: "City Compensatory Allowance",
        amount: cca,
        taxable: true,
      })
    }

    // Custom Allowances
    customAllowances.forEach((custom) => {
      const amount = parseFloat(custom.amount) || 0
      totalAllowances += amount
      if (custom.taxable) {
        taxableAllowances += amount
      }
      breakdown.push({
        name: custom.name,
        amount: amount,
        taxable: custom.taxable,
      })
    })

    const nonTaxableAllowances = totalAllowances - taxableAllowances

    setCalculationResult({
      totalAllowances,
      taxableAllowances,
      nonTaxableAllowances,
      breakdown,
    })

    toast.success("Allowances calculated successfully!")
  }

  const addCustomAllowance = () => {
    setCustomAllowances([
      ...customAllowances,
      {
        name: "",
        amount: "",
        taxable: false,
      },
    ])
  }

  const removeCustomAllowance = (index: number) => {
    setCustomAllowances(customAllowances.filter((_, i) => i !== index))
  }

  const updateCustomAllowance = (index: number, field: string, value: any) => {
    const updated = [...customAllowances]
    updated[index][field] = value
    setCustomAllowances(updated)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/payscale">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Allowance Calculator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Calculate various government allowances based on employee parameters
          </p>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="reference">Allowance Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="basicPay">Basic Pay *</Label>
                    <Input
                      id="basicPay"
                      type="number"
                      value={basicPay}
                      onChange={(e) => setBasicPay(e.target.value)}
                      placeholder="Enter basic pay"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cityType">City Classification *</Label>
                    <Select value={cityType} onValueChange={setCityType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="x">
                          X Class (Metro Cities)
                        </SelectItem>
                        <SelectItem value="y">
                          Y Class (Non-Metro Cities)
                        </SelectItem>
                        <SelectItem value="z">Z Class (Rural Areas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="children">Number of Children</Label>
                    <Input
                      id="children"
                      type="number"
                      min="0"
                      max="5"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum 2 eligible for CEA
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="hostel">Children in Hostel</Label>
                    <Input
                      id="hostel"
                      type="number"
                      min="0"
                      max="2"
                      value={hostelChildren}
                      onChange={(e) => setHostelChildren(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Special Duty Assignment</Label>
                      <p className="text-xs text-gray-500">
                        Additional 20% of Basic
                      </p>
                    </div>
                    <Switch
                      checked={specialDuty}
                      onCheckedChange={setSpecialDuty}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hill Area Posting</Label>
                      <p className="text-xs text-gray-500">₹1,060 per month</p>
                    </div>
                    <Switch checked={hillArea} onCheckedChange={setHillArea} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Custom Allowances</CardTitle>
                    <Button size="sm" onClick={addCustomAllowance}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {customAllowances.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No custom allowances added
                    </p>
                  ) : (
                    customAllowances.map((custom, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Allowance name"
                            value={custom.name}
                            onChange={(e) =>
                              updateCustomAllowance(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeCustomAllowance(index)}
                          >
                            <Minus className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={custom.amount}
                            onChange={(e) =>
                              updateCustomAllowance(
                                index,
                                "amount",
                                e.target.value,
                              )
                            }
                          />
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={custom.taxable}
                              onCheckedChange={(checked) =>
                                updateCustomAllowance(index, "taxable", checked)
                              }
                            />
                            <span className="text-xs text-gray-600 whitespace-nowrap">
                              Taxable
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Button onClick={handleCalculate} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Total Allowances
              </Button>
            </div>

            {/* Results Section */}
            {calculationResult ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Allowance Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {calculationResult.breakdown.map(
                        (item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              {item.taxable && (
                                <Badge
                                  variant="outline"
                                  className="text-xs mt-1"
                                >
                                  Taxable
                                </Badge>
                              )}
                            </div>
                            <span className="font-semibold">
                              ₹{Math.round(item.amount).toLocaleString()}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total Allowances</span>
                      <span className="font-bold text-blue-700">
                        ₹
                        {Math.round(
                          calculationResult.totalAllowances,
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Taxable Amount</span>
                      <span className="font-semibold text-red-700">
                        ₹
                        {Math.round(
                          calculationResult.taxableAllowances,
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Non-Taxable Amount</span>
                      <span className="font-semibold text-green-700">
                        ₹
                        {Math.round(
                          calculationResult.nonTaxableAllowances,
                        ).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calculator className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">
                    Configure allowance parameters and click "Calculate" to see
                    breakdown
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reference">
          <div className="space-y-6">
            {allowanceTypes.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.allowances.map((allowance, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{allowance.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {allowance.description}
                            </p>
                          </div>
                          {allowance.taxable ? (
                            <Badge variant="destructive">Taxable</Badge>
                          ) : (
                            <Badge variant="secondary">Non-Taxable</Badge>
                          )}
                        </div>
                        <div className="mt-3 p-2 bg-gray-50 rounded">
                          <p className="text-sm">
                            <span className="font-medium">Formula: </span>
                            {allowance.formula}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
