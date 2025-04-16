"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartBars,
  ChartBar,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

// Mock data for demonstration
const monthlyEarnings = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1450 },
  { month: "Mar", amount: 1800 },
  { month: "Apr", amount: 1600 },
  { month: "May", amount: 2100 },
  { month: "Jun", amount: 1900 },
]

const weeklyEarnings = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 240 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 300 },
  { day: "Fri", amount: 260 },
  { day: "Sat", amount: 150 },
  { day: "Sun", amount: 0 },
]

export function EarningsSummary() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 rounded-xl shadow-sm bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold">$12,450</p>
          <p className="text-sm text-green-600 mt-2">+15% from last month</p>
        </Card>

        <Card className="p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            This Month
          </h3>
          <p className="text-3xl font-bold">$2,100</p>
          <p className="text-sm text-muted-foreground mt-2">42 sessions</p>
        </Card>

        <Card className="p-6 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            This Week
          </h3>
          <p className="text-3xl font-bold">$480</p>
          <p className="text-sm text-muted-foreground mt-2">8 sessions</p>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <div className="h-80">
            <ChartContainer config={{}}>
              <ChartYAxis />
              <ChartXAxis />
              <ChartBars>
                {monthlyEarnings.map((data) => (
                  <ChartBar
                    key={data.month}
                    value={data.amount}
                    label={data.month}
                    className="fill-emerald-500"
                  />
                ))}
              </ChartBars>
              <ChartTooltip />
            </ChartContainer>
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="h-80">
            <ChartContainer config={{}}>
              <ChartYAxis />
              <ChartXAxis />
              <ChartBars>
                {weeklyEarnings.map((data) => (
                  <ChartBar
                    key={data.day}
                    value={data.amount}
                    label={data.day}
                    className="fill-emerald-500"
                  />
                ))}
              </ChartBars>
              <ChartTooltip />
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
