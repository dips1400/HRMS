import { useState } from "react"
import { Calculator, ArrowLeft, TrendingUp } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { toast } from "sonner"

export function TediousCalculations() {
  const [basicPay, setBasicPay] = useState("45000")
  const [level, setLevel] = useState("5")
  const [stage, setStage] = useState("10")
  const [location, setLocation] = useState("x")
  const [calculationResult, setCalculationResult] = useState<any>(null)

  const handleCalculate = () => {
    const basic = parseFloat(basicPay)

    // HRA Calculation based on location
    let hraPercent = 0
    if (location === "x")
      hraPercent = 24 // X Class cities
    else if (location === "y")
      hraPercent = 16 // Y Class cities
    else hraPercent = 8 // Z Class cities

    const hra = (basic * hraPercent) / 100

    // DA Calculation (current rate - updates periodically)
    const daPercent = 50 // Example: 50% as of Jan 2024
    const da = (basic * daPercent) / 100

    // Transport Allowance
    const transport = location === "x" ? 7200 : location === "y" ? 3600 : 1800

    // Medical Allowance (Fixed)
    const medical = 1000

    // Children Education Allowance (per child, max 2)
    const ceaPerChild = 2250
    const cea = ceaPerChild * 2 // Assuming 2 children

    // Washing Allowance
    const washingAllowance = 300

    // Gross Salary
    const gross =
      basic + hra + da + transport + medical + cea + washingAllowance

    // Deductions
    // GPF/NPS - 10% of basic
    const gpf = basic * 0.1

    // Professional Tax (varies by state)
    const professionalTax = 200

    // Income Tax (simplified calculation)
    const annualGross = gross * 12
    let incomeTax = 0
    if (annualGross > 1000000) {
      incomeTax = Math.round(((annualGross - 1000000) * 0.2 + 62500) / 12)
    } else if (annualGross > 500000) {
      incomeTax = Math.round(((annualGross - 500000) * 0.1) / 12)
    }

    // CGHS/Medical Insurance
    const cghs = 350

    // Total Deductions
    const totalDeductions = gpf + professionalTax + incomeTax + cghs

    // Net Salary
    const netPay = gross - totalDeductions

    // Annual Increment Calculation
    const incrementPercent = 3
    const annualIncrement = (basic * incrementPercent) / 100
    const nextBasic = basic + annualIncrement

    setCalculationResult({
      basic,
      hra,
      hraPercent,
      da,
      daPercent,
      transport,
      medical,
      cea,
      washingAllowance,
      gross,
      gpf,
      professionalTax,
      incomeTax,
      cghs,
      totalDeductions,
      netPay,
      annualIncrement,
      nextBasic,
    })

    toast.success("Calculation completed successfully!")
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
            Tedious Salary Calculations
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Calculate complex salary components including allowances and
            deductions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Parameters</CardTitle>
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
              <Label htmlFor="level">Pay Level *</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Level-1 (18000-56900)</SelectItem>
                  <SelectItem value="2">Level-2 (19900-63200)</SelectItem>
                  <SelectItem value="3">Level-3 (21700-69100)</SelectItem>
                  <SelectItem value="4">Level-4 (25500-81100)</SelectItem>
                  <SelectItem value="5">Level-5 (29200-92300)</SelectItem>
                  <SelectItem value="6">Level-6 (35400-112400)</SelectItem>
                  <SelectItem value="7">Level-7 (44900-142400)</SelectItem>
                  <SelectItem value="8">Level-8 (47600-151100)</SelectItem>
                  <SelectItem value="9">Level-9 (53100-167800)</SelectItem>
                  <SelectItem value="10">Level-10 (56100-177500)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stage">Current Stage *</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(40)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Stage {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Posting Location *</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">X Class Cities (24% HRA)</SelectItem>
                  <SelectItem value="y">Y Class Cities (16% HRA)</SelectItem>
                  <SelectItem value="z">Z Class Cities (8% HRA)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleCalculate} className="w-full">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Salary
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {calculationResult && (
          <Card>
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Earnings */}
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Earnings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Basic Pay</span>
                    <span className="font-medium">
                      ₹{calculationResult.basic.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      HRA ({calculationResult.hraPercent}%)
                    </span>
                    <span className="font-medium">
                      ₹{Math.round(calculationResult.hra).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      DA ({calculationResult.daPercent}%)
                    </span>
                    <span className="font-medium">
                      ₹{Math.round(calculationResult.da).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transport Allowance</span>
                    <span className="font-medium">
                      ₹{calculationResult.transport.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medical Allowance</span>
                    <span className="font-medium">
                      ₹{calculationResult.medical.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Children Education Allowance
                    </span>
                    <span className="font-medium">
                      ₹{calculationResult.cea.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Washing Allowance</span>
                    <span className="font-medium">
                      ₹{calculationResult.washingAllowance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Gross Salary</span>
                    <span className="text-green-700">
                      ₹{Math.round(calculationResult.gross).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Deductions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPF/NPS (10%)</span>
                    <span className="font-medium">
                      ₹{Math.round(calculationResult.gpf).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Professional Tax</span>
                    <span className="font-medium">
                      ₹{calculationResult.professionalTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Income Tax</span>
                    <span className="font-medium">
                      ₹{calculationResult.incomeTax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CGHS</span>
                    <span className="font-medium">
                      ₹{calculationResult.cghs.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Total Deductions</span>
                    <span className="text-red-700">
                      ₹
                      {Math.round(
                        calculationResult.totalDeductions,
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Pay */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Net Pay (Take Home)
                  </span>
                  <span className="text-2xl font-bold text-blue-700">
                    ₹{Math.round(calculationResult.netPay).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Annual Increment */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Next Annual Increment
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Increment Amount (3%)</span>
                    <span className="font-medium">
                      ₹
                      {Math.round(
                        calculationResult.annualIncrement,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Basic Pay</span>
                    <span className="font-semibold text-purple-700">
                      ₹
                      {Math.round(calculationResult.nextBasic).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!calculationResult && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calculator className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">
                Enter salary parameters and click "Calculate Salary" to see
                detailed breakdown
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Calculation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Notes & Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">HRA Calculation</h4>
              <p className="text-sm text-gray-600 mb-2">
                House Rent Allowance is calculated as percentage of Basic Pay
                based on city classification:
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• X Class Cities (Metro): 24% of Basic Pay</li>
                <li>• Y Class Cities (Non-Metro): 16% of Basic Pay</li>
                <li>• Z Class Cities (Rural): 8% of Basic Pay</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">DA Calculation</h4>
              <p className="text-sm text-gray-600 mb-2">
                Dearness Allowance is revised twice a year (Jan & July):
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Based on All India Consumer Price Index</li>
                <li>• Current Rate: 50% (as of Jan 2024)</li>
                <li>• Formula: (Basic Pay × DA%) / 100</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Transport Allowance</h4>
              <p className="text-sm text-gray-600 mb-2">
                Fixed monthly allowance based on city:
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• X Class Cities: ₹7,200/month</li>
                <li>• Y Class Cities: ₹3,600/month</li>
                <li>• Z Class Cities: ₹1,800/month</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">GPF/NPS Deduction</h4>
              <p className="text-sm text-gray-600 mb-2">
                Mandatory retirement savings:
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Old Employees: GPF at 10% of Basic</li>
                <li>• New Employees: NPS at 10% of Basic</li>
                <li>• Government contributes 14% additionally</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Annual Increment</h4>
              <p className="text-sm text-gray-600 mb-2">
                Standard increment calculation:
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Rate: 3% of current Basic Pay</li>
                <li>• Date: July 1st every year</li>
                <li>• Method: Move to next stage in pay matrix</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">
                Children Education Allowance
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                For children's education expenses:
              </p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• ₹2,250 per child per month</li>
                <li>• Maximum for 2 children</li>
                <li>• Hostel subsidy: Additional ₹6,750/month</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
