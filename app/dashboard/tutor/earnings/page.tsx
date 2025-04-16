import { EarningsSummary } from "@/components/tutor/earnings-summary"
import { PaymentSetupForm } from "@/components/tutor/payment-setup-form"
import { PricingForm } from "@/components/tutor/pricing-form"

export default function EarningsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Earnings & Pricing</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-2xl p-6 shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Earnings Summary</h2>
          <EarningsSummary />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Set Pricing</h2>
          <PricingForm />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Setup</h2>
          <PaymentSetupForm />
        </div>
      </div>
    </div>
  )
}
