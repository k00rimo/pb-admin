import type { Metadata } from "next"
import ChallengeDetail from "@/components/admin/challenge-detail"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Detail výzvy",
  description: "Správa konkrétnej výzvy a jej odovzdaní",
}

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <ChallengeDetail challengeId={params.id} />
      </main>
    </div>
  )
}

