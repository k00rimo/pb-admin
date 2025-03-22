"use client"

import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Monitor activities, manage members, and view statistics",
}

export default function AdminPage() {
  return <AdminDashboard />
}

