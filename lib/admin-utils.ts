// Types for admin panel
export interface Activity {
  id: string
  user: string
  action: string
  timestamp: string
  ipAddress: string
  status: "success" | "warning" | "error"
}

export interface Member {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "member"
  status: "active" | "inactive" | "pending"
  joinedDate: string
  avatarUrl?: string
}

// Utility functions for admin panel
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

export function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) return "+100%"

  const change = ((current - previous) / previous) * 100
  const sign = change >= 0 ? "+" : ""
  return `${sign}${change.toFixed(1)}%`
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + "..."
}

