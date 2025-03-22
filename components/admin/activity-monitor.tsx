"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ActivityMonitorProps {
  limit?: number
}

export function ActivityMonitor({ limit }: ActivityMonitorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activityType, setActivityType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data for activities
  const activities = [
    {
      id: "act-1",
      user: "John Doe",
      action: "Login",
      timestamp: "2023-05-15 09:23:11",
      ipAddress: "192.168.1.1",
      status: "success",
    },
    {
      id: "act-2",
      user: "Jane Smith",
      action: "Create Project",
      timestamp: "2023-05-15 10:45:22",
      ipAddress: "192.168.1.2",
      status: "success",
    },
    {
      id: "act-3",
      user: "Mike Johnson",
      action: "Delete File",
      timestamp: "2023-05-15 11:12:45",
      ipAddress: "192.168.1.3",
      status: "warning",
    },
    {
      id: "act-4",
      user: "Sarah Williams",
      action: "Update Profile",
      timestamp: "2023-05-15 13:56:32",
      ipAddress: "192.168.1.4",
      status: "success",
    },
    {
      id: "act-5",
      user: "David Brown",
      action: "Failed Login",
      timestamp: "2023-05-15 14:23:18",
      ipAddress: "192.168.1.5",
      status: "error",
    },
    {
      id: "act-6",
      user: "Emily Davis",
      action: "Share Document",
      timestamp: "2023-05-15 15:11:09",
      ipAddress: "192.168.1.6",
      status: "success",
    },
    {
      id: "act-7",
      user: "Robert Wilson",
      action: "API Access",
      timestamp: "2023-05-15 16:45:27",
      ipAddress: "192.168.1.7",
      status: "success",
    },
    {
      id: "act-8",
      user: "Jennifer Taylor",
      action: "Password Reset",
      timestamp: "2023-05-15 17:22:14",
      ipAddress: "192.168.1.8",
      status: "warning",
    },
  ]

  // Filter activities based on search query and activity type
  const filteredActivities = activities
    .filter(
      (activity) =>
        activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((activity) => activityType === "all" || activity.status === activityType)

  // Limit the number of activities if limit is provided
  const displayedActivities = limit ? filteredActivities.slice(0, limit) : filteredActivities

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      case "error":
        return <Badge className="bg-red-500">Error</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
              {!limit && <TableHead className="w-[70px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedActivities.length > 0 ? (
              displayedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>{activity.ipAddress}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  {!limit && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Flag for Review</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={limit ? 5 : 6} className="h-24 text-center">
                  No activities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>1</strong> to <strong>{displayedActivities.length}</strong> of{" "}
            <strong>{filteredActivities.length}</strong> activities
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * 10 >= filteredActivities.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

