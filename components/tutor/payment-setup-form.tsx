"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function PaymentSetupForm() {
  const [paymentMethod, setPaymentMethod] = useState("bank")

  return (
    <form className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank" className="font-medium">
            Bank Transfer
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="font-medium">
            UPI
          </Label>
        </div>
      </RadioGroup>

      <Separator />

      {paymentMethod === "bank" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Holder Name</Label>
            <Input id="accountName" placeholder="Enter account holder name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" placeholder="Enter account number" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifsc">IFSC Code</Label>
            <Input id="ifsc" placeholder="Enter IFSC code" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" placeholder="Enter bank name" />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input id="upiId" placeholder="username@upi" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upiName">Name on UPI</Label>
            <Input id="upiName" placeholder="Enter name registered with UPI" />
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Save Payment Details
      </Button>
    </form>
  )
}
