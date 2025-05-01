"use client"

import { useState, useEffect } from "react"
import { Calculator, DollarSign, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface FinanceCalculatorProps {
  vehiclePrice?: number
  className?: string
}

export default function FinanceCalculator({ vehiclePrice = 30000, className }: FinanceCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(vehiclePrice)
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.2))
  const [interestRate, setInterestRate] = useState(4.5)
  const [loanTerm, setLoanTerm] = useState(60) // 60 months
  const [paymentFrequency, setPaymentFrequency] = useState<"monthly" | "biweekly" | "weekly">("monthly")
  const [includeInsurance, setIncludeInsurance] = useState(false)
  const [insuranceCost, setInsuranceCost] = useState(150)
  const [includeTax, setIncludeTax] = useState(true)
  const [taxRate, setTaxRate] = useState(7.5)
  const [includeTradeIn, setIncludeTradeIn] = useState(false)
  const [tradeInValue, setTradeInValue] = useState(5000)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])

  // Calculate loan details
  useEffect(() => {
    // Calculate vehicle price with tax if included
    let calculatedVehiclePrice = vehiclePrice
    if (includeTax) {
      calculatedVehiclePrice += vehiclePrice * (taxRate / 100)
    }

    // Apply trade-in if included
    if (includeTradeIn) {
      calculatedVehiclePrice = Math.max(0, calculatedVehiclePrice - tradeInValue)
    }

    // Calculate loan amount after down payment
    const calculatedLoanAmount = Math.max(0, calculatedVehiclePrice - downPayment)
    setLoanAmount(calculatedLoanAmount)

    // Calculate monthly payment
    const monthlyInterestRate = interestRate / 100 / 12
    let calculatedMonthlyPayment = 0

    if (interestRate === 0) {
      calculatedMonthlyPayment = calculatedLoanAmount / loanTerm
    } else {
      calculatedMonthlyPayment =
        (calculatedLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
        (Math.pow(1 + monthlyInterestRate, loanTerm) - 1)
    }

    // Add insurance if included
    if (includeInsurance) {
      calculatedMonthlyPayment += insuranceCost
    }

    // Adjust for payment frequency
    let adjustedPayment = calculatedMonthlyPayment
    if (paymentFrequency === "biweekly") {
      adjustedPayment = (calculatedMonthlyPayment * 12) / 26
    } else if (paymentFrequency === "weekly") {
      adjustedPayment = (calculatedMonthlyPayment * 12) / 52
    }

    setMonthlyPayment(adjustedPayment)

    // Calculate total interest
    const totalPayments =
      paymentFrequency === "monthly"
        ? loanTerm
        : paymentFrequency === "biweekly"
          ? 26 * (loanTerm / 12)
          : 52 * (loanTerm / 12)
    const totalPaid = adjustedPayment * totalPayments
    const calculatedTotalInterest = totalPaid - calculatedLoanAmount - (includeInsurance ? insuranceCost * loanTerm : 0)
    setTotalInterest(calculatedTotalInterest)

    // Calculate total cost
    const calculatedTotalCost = totalPaid + downPayment
    setTotalCost(calculatedTotalCost)

    // Generate amortization schedule
    const schedule = []
    let remainingBalance = calculatedLoanAmount
    let totalInterestPaid = 0

    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate
      const principalPayment = calculatedMonthlyPayment - interestPayment
      remainingBalance -= principalPayment
      totalInterestPaid += interestPayment

      if (month <= 12 || month === loanTerm || month % 12 === 0) {
        schedule.push({
          month,
          payment: calculatedMonthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          totalInterest: totalInterestPaid,
          balance: Math.max(0, remainingBalance),
        })
      }
    }

    setAmortizationSchedule(schedule)
  }, [
    vehiclePrice,
    downPayment,
    interestRate,
    loanTerm,
    paymentFrequency,
    includeInsurance,
    insuranceCost,
    includeTax,
    taxRate,
    includeTradeIn,
    tradeInValue,
  ])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Auto Financing Calculator
        </CardTitle>
        <CardDescription>Estimate your monthly payments and total cost of ownership</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inputs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inputs">Loan Details</TabsTrigger>
            <TabsTrigger value="summary">Payment Summary</TabsTrigger>
            <TabsTrigger value="schedule">Amortization</TabsTrigger>
          </TabsList>

          <TabsContent value="inputs" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                    <span className="text-sm font-medium">${vehiclePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <DollarSign className="h-10 w-5 text-muted-foreground" />
                    <Input
                      id="vehiclePrice"
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setDownPayment(Math.round(Number.parseInt(e.target.value) * 0.2))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <span className="text-sm font-medium">${downPayment.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="downPayment"
                    min={0}
                    max={vehiclePrice}
                    step={500}
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>${vehiclePrice.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <span className="text-sm font-medium">{interestRate.toFixed(2)}%</span>
                  </div>
                  <Slider
                    id="interestRate"
                    min={0}
                    max={15}
                    step={0.1}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <span className="text-sm font-medium">{loanTerm} months</span>
                  </div>
                  <Slider
                    id="loanTerm"
                    min={12}
                    max={84}
                    step={12}
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12 months</span>
                    <span>84 months</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Payment Frequency</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={paymentFrequency === "monthly" ? "default" : "outline"}
                      onClick={() => setPaymentFrequency("monthly")}
                      className="w-full"
                    >
                      Monthly
                    </Button>
                    <Button
                      type="button"
                      variant={paymentFrequency === "biweekly" ? "default" : "outline"}
                      onClick={() => setPaymentFrequency("biweekly")}
                      className="w-full"
                    >
                      Bi-weekly
                    </Button>
                    <Button
                      type="button"
                      variant={paymentFrequency === "weekly" ? "default" : "outline"}
                      onClick={() => setPaymentFrequency("weekly")}
                      className="w-full"
                    >
                      Weekly
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeTax"
                      checked={includeTax}
                      onChange={(e) => setIncludeTax(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="includeTax" className="text-sm font-normal">
                      Include Sales Tax
                    </Label>
                  </div>
                  {includeTax && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number.parseFloat(e.target.value))}
                        className="w-20 h-8"
                      />
                      <span className="text-sm">%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeInsurance"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="includeInsurance" className="text-sm font-normal">
                      Include Insurance
                    </Label>
                  </div>
                  {includeInsurance && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={insuranceCost}
                        onChange={(e) => setInsuranceCost(Number.parseInt(e.target.value))}
                        className="w-20 h-8"
                      />
                      <span className="text-sm">/mo</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeTradeIn"
                      checked={includeTradeIn}
                      onChange={(e) => setIncludeTradeIn(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="includeTradeIn" className="text-sm font-normal">
                      Include Trade-in
                    </Label>
                  </div>
                  {includeTradeIn && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={tradeInValue}
                        onChange={(e) => setTradeInValue(Number.parseInt(e.target.value))}
                        className="w-28 h-8"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-secondary/30">
                  <span className="text-sm text-muted-foreground mb-1">
                    {paymentFrequency === "monthly"
                      ? "Monthly"
                      : paymentFrequency === "biweekly"
                        ? "Bi-weekly"
                        : "Weekly"}{" "}
                    Payment
                  </span>
                  <span className="text-3xl font-bold text-primary">${monthlyPayment.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {paymentFrequency === "monthly"
                      ? `For ${loanTerm} months`
                      : paymentFrequency === "biweekly"
                        ? `Every two weeks for ${Math.round((loanTerm / 12) * 26)} payments`
                        : `Weekly for ${Math.round((loanTerm / 12) * 52)} payments`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Loan Amount</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Vehicle price minus down payment, plus tax if applicable.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-xl font-bold">${loanAmount.toFixed(2)}</span>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Total Interest</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Total interest paid over the life of the loan.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-xl font-bold">${totalInterest.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Payment Breakdown</h3>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Vehicle Price</TableCell>
                      <TableCell className="text-right">${vehiclePrice.toLocaleString()}</TableCell>
                    </TableRow>
                    {includeTax && (
                      <TableRow>
                        <TableCell className="font-medium">Sales Tax ({taxRate}%)</TableCell>
                        <TableCell className="text-right">
                          ${(vehiclePrice * (taxRate / 100)).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )}
                    {includeTradeIn && (
                      <TableRow>
                        <TableCell className="font-medium">Trade-in Value</TableCell>
                        <TableCell className="text-right">-${tradeInValue.toLocaleString()}</TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="font-medium">Down Payment</TableCell>
                      <TableCell className="text-right">-${downPayment.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Loan Amount</TableCell>
                      <TableCell className="text-right">${loanAmount.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Interest Rate</TableCell>
                      <TableCell className="text-right">{interestRate.toFixed(2)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Loan Term</TableCell>
                      <TableCell className="text-right">{loanTerm} months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Interest</TableCell>
                      <TableCell className="text-right">${totalInterest.toFixed(2)}</TableCell>
                    </TableRow>
                    {includeInsurance && (
                      <TableRow>
                        <TableCell className="font-medium">Insurance (over term)</TableCell>
                        <TableCell className="text-right">${(insuranceCost * loanTerm).toLocaleString()}</TableCell>
                      </TableRow>
                    )}
                    <TableRow className="border-t-2">
                      <TableCell className="font-medium">Total Cost</TableCell>
                      <TableCell className="text-right font-bold">${totalCost.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="pt-4">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Total Interest</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>${row.payment.toFixed(2)}</TableCell>
                      <TableCell>${row.principal.toFixed(2)}</TableCell>
                      <TableCell>${row.interest.toFixed(2)}</TableCell>
                      <TableCell>${row.totalInterest.toFixed(2)}</TableCell>
                      <TableCell>${row.balance.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Showing first year, annual totals, and final payment. Insurance costs not included in amortization.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Apply for Financing</Button>
      </CardFooter>
    </Card>
  )
}
