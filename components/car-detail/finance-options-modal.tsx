"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface FinanceOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  carName: string
  carPrice: number
}

export default function FinanceOptionsModal({ isOpen, onClose, carName, carPrice }: FinanceOptionsModalProps) {
  const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2))
  const [loanTerm, setLoanTerm] = useState(60) // 60 months
  const [creditScore, setCreditScore] = useState(700)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate interest rate based on credit score
  const getInterestRate = () => {
    if (creditScore >= 780) return 3.49
    if (creditScore >= 720) return 4.29
    if (creditScore >= 680) return 5.99
    if (creditScore >= 620) return 7.49
    return 9.99
  }

  const interestRate = getInterestRate()
  const loanAmount = carPrice - downPayment
  const monthlyInterestRate = interestRate / 100 / 12
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) /
    (Math.pow(1 + monthlyInterestRate, loanTerm) - 1)
  const totalInterest = monthlyPayment * loanTerm - loanAmount
  const totalCost = loanAmount + totalInterest

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Finance application submitted:", {
      carName,
      carPrice,
      downPayment,
      loanTerm,
      creditScore,
      interestRate,
      monthlyPayment,
    })

    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Finance Options</DialogTitle>
          <DialogDescription>Explore financing options for the {carName}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="downPayment">Down Payment</Label>
                <span className="text-sm">${downPayment.toLocaleString()}</span>
              </div>
              <Slider
                id="downPayment"
                min={0}
                max={Math.round(carPrice * 0.5)}
                step={500}
                value={[downPayment]}
                onValueChange={(value) => setDownPayment(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>${Math.round(carPrice * 0.5).toLocaleString()}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="loanTerm">Loan Term</Label>
                <span className="text-sm">{loanTerm} months</span>
              </div>
              <Slider
                id="loanTerm"
                min={24}
                max={84}
                step={12}
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>24 months</span>
                <span>84 months</span>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="creditScore">Estimated Credit Score</Label>
                <span className="text-sm">{creditScore}</span>
              </div>
              <Slider
                id="creditScore"
                min={550}
                max={850}
                step={10}
                value={[creditScore]}
                onValueChange={(value) => setCreditScore(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Estimated Payment Summary</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Vehicle Price</TableCell>
                    <TableCell className="text-right">${carPrice.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Down Payment</TableCell>
                    <TableCell className="text-right">${downPayment.toLocaleString()}</TableCell>
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
                    <TableCell className="font-medium">Monthly Payment</TableCell>
                    <TableCell className="text-right font-bold">${monthlyPayment.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Interest</TableCell>
                    <TableCell className="text-right">${totalInterest.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Cost</TableCell>
                    <TableCell className="text-right">${totalCost.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Applying..." : "Apply for Financing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
