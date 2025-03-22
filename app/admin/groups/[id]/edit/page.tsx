import type { Metadata } from "next"
import GroupForm from "@/components/admin/group-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Upraviť skupinu",
  description: "Úprava existujúcej skupiny používateľov",
}

export default function EditGroupPage({ params }: { params: { id: string } }) {
  // V reálnej aplikácii by sme tu načítali dáta skupiny zo servera
  const mockGroup = {
    id: params.id,
    name: "Ukážková skupina",
    description: "Toto je popis skupiny, ktorý by bol načítaný zo servera.",
    ownerId: "usr-1",
    ownerName: "Ján Novák",
    ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
    memberCount: 3,
    members: [
      {
        id: "usr-1",
        name: "Ján Novák",
        email: "jan.novak@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        joinedDate: "2023-01-15",
      },
      {
        id: "usr-2",
        name: "Alena Veselá",
        email: "alena.vesela@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        joinedDate: "2023-01-16",
      },
      {
        id: "usr-3",
        name: "Peter Tichý",
        email: "peter.tichy@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        joinedDate: "2023-01-18",
      },
    ],
    createdAt: new Date(),
    status: "active" as const,
    type: "community" as const,
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Upraviť skupinu</h1>
        </div>
        <GroupForm group={mockGroup} isEditing={true} />
      </main>
    </div>
  )
}

