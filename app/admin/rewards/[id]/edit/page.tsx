import type { Metadata } from "next"
import RewardForm from "@/components/admin/reward-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Upraviť odmenu",
  description: "Úprava existujúcej odmeny za body",
}

export default function EditRewardPage({ params }: { params: { id: string } }) {
  // V reálnej aplikácii by sme tu načítali dáta odmeny zo servera
  const mockReward = {
    id: params.id,
    title: "Ukážková odmena",
    description: "Toto je popis odmeny, ktorý by bol načítaný zo servera.",
    pointsCost: 500,
    isIndividualClaimable: true,
    quantity: 50,
    remainingQuantity: 42,
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    category: "merchandise",
    status: "active" as const,
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Upraviť odmenu</h1>
        </div>
        <RewardForm reward={mockReward} isEditing={true} />
      </main>
    </div>
  )
}

