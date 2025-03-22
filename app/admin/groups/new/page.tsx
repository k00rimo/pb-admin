import type { Metadata } from "next"
import GroupForm from "@/components/admin/group-form"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Pridať novú skupinu",
  description: "Vytvorenie novej skupiny používateľov",
}

export default function NewGroupPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pridať novú skupinu</h1>
        </div>
        <GroupForm />
      </main>
    </div>
  )
}

