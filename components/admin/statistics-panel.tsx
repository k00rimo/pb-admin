"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StatisticsPanel() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Performance Metrics</h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Users" value="1,234" change="+12%" description="vs. previous period" />
            <MetricCard title="Active Users" value="945" change="+5.3%" description="vs. previous period" />
            <MetricCard title="New Signups" value="145" change="+22.4%" description="vs. previous period" />
            <MetricCard
              title="Conversion Rate"
              value="3.2%"
              change="-0.4%"
              isNegative
              description="vs. previous period"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartPlaceholder />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Activities" value="15,234" change="+8.2%" description="vs. previous period" />
            <MetricCard title="Avg. Daily" value="2,172" change="+3.1%" description="vs. previous period" />
            <MetricCard title="Peak Hour" value="2-3 PM" description="Most active time" />
            <MetricCard title="Error Rate" value="0.8%" change="-0.3%" description="vs. previous period" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Distribution</CardTitle>
              <CardDescription>Activity patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartPlaceholder />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Storage Used" value="1.2 TB" change="+0.2 TB" description="vs. previous period" />
            <MetricCard title="Bandwidth" value="4.5 TB" change="+15%" description="vs. previous period" />
            <MetricCard title="API Calls" value="3.2M" change="+22%" description="vs. previous period" />
            <MetricCard title="Avg. Response" value="235ms" change="-15ms" description="vs. previous period" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>System resource usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartPlaceholder />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change?: string
  isNegative?: boolean
  description: string
}

function MetricCard({ title, value, change, isNegative = false, description }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs">
            <span className={isNegative ? "text-red-500" : "text-green-500"}>{change}</span> {description}
          </p>
        )}
        {!change && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

function ChartPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
        <p className="text-xs text-muted-foreground">(In a real application, this would be a chart component)</p>
      </div>
    </div>
  )
}

