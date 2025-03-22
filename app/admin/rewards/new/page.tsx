import type { Metadata } from "next"
import RewardForm from "@/components/admin/reward-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Pridať novú odmenu",
  description: "Vytvorenie novej odmeny za body pre používateľov",
}

export default function NewRewardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pridať novú odmenu</h1>
        </div>
      </main>
      <RewardForm />
    </div>
  )
}

