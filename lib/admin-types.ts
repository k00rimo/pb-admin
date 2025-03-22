// Typy pre admin panel
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

export interface Challenge {
  id: string
  title: string
  description: string
  points: number
  startDate: Date
  endDate: Date
  status: "draft" | "active" | "upcoming" | "completed" | "waiting-for-confirmation"
  category: string
  participants: number
  submissionType: "photo-before-after" | "photo-single" | "attendance" | "location-check" | "other"
  submissionCriteria: string
  useAiVerification: boolean
  // Polia pre podujatia
  location?: string
  capacity?: number
  registered?: number
  isEvent?: boolean
  time?: string
  submissions?: ChallengeSubmission[]
}

export interface ChallengeSubmission {
  id: string
  userId: string
  userName: string
  challengeId: string
  submittedAt: Date
  status: "pending" | "approved" | "rejected"
  photoUrls: string[]
  notes?: string
}

// Utility functions for admin panel
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("sk-SK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat("sk-SK", {
    year: "numeric",
    month: "long",
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

