import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { EarningsSummary } from "@/components/tutor/earnings-summary"
import { PaymentSetupForm } from "@/components/tutor/payment-setup-form"
import { PricingForm } from "@/components/tutor/pricing-form"

export default function EarningsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Earnings & Pricing" text="Manage your rates and payment information">
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          Download Tax Documents
        </Button>
      </DashboardHeader>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Earnings Summary</h2>
          <EarningsSummary />
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Set Pricing</h2>
            <PricingForm />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Setup</h2>
            <PaymentSetupForm />
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}