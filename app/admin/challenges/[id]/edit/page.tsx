import type { Metadata } from "next"
import ChallengeForm from "@/components/admin/challenge-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Upraviť výzvu",
  description: "Úprava existujúcej výzvy pre občiansku participáciu",
}

export default function EditChallengePage({ params }: { params: { id: string } }) {
  // V reálnej aplikácii by sme tu načítali dáta výzvy zo servera
  const mockChallenge = {
    id: params.id,
    title: "Ukážková výzva",
    description: "Toto je popis výzvy, ktorý by bol načítaný zo servera.",
    points: 100,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "draft" as const,
    category: "environment",
    participants: 0,
    submissionType: "photo-single" as const,
    submissionCriteria: "Odfoť sa pri plnení výzvy ako dôkaz účasti.",
    useAiVerification: false,
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Upraviť výzvu</h1>
        </div>
        <ChallengeForm challenge={mockChallenge} isEditing={true} />
      </main>
    </div>
  )
}

