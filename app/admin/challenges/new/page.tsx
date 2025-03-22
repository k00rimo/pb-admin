import type { Metadata } from "next"
import ChallengeForm from "@/components/admin/challenge-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Pridať novú výzvu",
  description: "Vytvorenie novej výzvy pre občiansku participáciu",
}

export default function NewChallengePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pridať novú výzvu</h1>
        </div>
        <ChallengeForm />
      </main>
    </div>
  )
}

