"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Upload } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Member {
  id: string
  name: string
  email: string
  avatarUrl?: string
  joinedDate: string
}

interface Group {
  id: string
  name: string
  description: string
  ownerId: string
  ownerName: string
  ownerAvatarUrl?: string
  memberCount: number
  members: Member[]
  createdAt: Date
  status: "active" | "inactive" | "pending"
  type: "community" | "project" | "interest" | "other"
  imageUrl?: string
}

interface GroupFormProps {
  group?: Group
  isEditing?: boolean
}

export default function GroupForm({ group, isEditing = false }: GroupFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Group>>(
    group || {
      name: "",
      description: "",
      ownerId: "",
      ownerName: "",
      status: "active",
      type: "community",
      members: [],
      memberCount: 0,
    },
  )

  // Vzorové dáta pre používateľov (v reálnej aplikácii by boli načítané z API)
  const [availableUsers, setAvailableUsers] = useState<Member[]>([
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
    {
      id: "usr-4",
      name: "Martin Zelený",
      email: "martin.zeleny@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      joinedDate: "2023-02-10",
    },
    {
      id: "usr-5",
      name: "Tomáš Vysoký",
      email: "tomas.vysoky@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      joinedDate: "2023-03-05",
    },
  ])

  const [selectedOwner, setSelectedOwner] = useState<string>(group?.ownerId || "")
  const [selectedMembers, setSelectedMembers] = useState<string[]>(group?.members.map((member) => member.id) || [])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Získanie údajov o vlastníkovi
    const owner = availableUsers.find((user) => user.id === selectedOwner)

    // Získanie údajov o členoch
    const members = availableUsers.filter((user) => selectedMembers.includes(user.id))

    // Vytvorenie kompletných údajov o skupine
    const completeFormData = {
      ...formData,
      ownerId: selectedOwner,
      ownerName: owner?.name || "",
      ownerAvatarUrl: owner?.avatarUrl,
      members,
      memberCount: members.length,
      createdAt: isEditing ? group?.createdAt || new Date() : new Date(),
    }

    // V reálnej aplikácii by sme tu mali volanie API
    console.log("Odosielam formulár:", completeFormData)

    // Simulácia úspešného odoslania
    alert(isEditing ? "Skupina bola úspešne aktualizovaná" : "Skupina bola úspešne vytvorená")

    // Presmerovanie späť na stránku správy skupín
    router.push("/admin?tab=groups")
  }

  const updateFormData = (fields: Partial<Group>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const filteredUsers = availableUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleMember = (userId: string) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== userId))
    } else {
      setSelectedMembers([...selectedMembers, userId])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <CardHeader>
          <Link
            href="/admin?tab=groups"
            className="flex items-center text-sm text-muted-foreground mb-2 hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Späť na zoznam skupín
          </Link>
          <CardTitle>{isEditing ? "Upraviť skupinu" : "Nová skupina"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Upravte informácie o existujúcej skupine"
              : "Vyplňte formulár na vytvorenie novej skupiny používateľov"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Názov skupiny</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Zadajte názov skupiny"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis skupiny</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Podrobný popis skupiny a jej cieľov"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Typ skupiny</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData({ type: value as Group["type"] })}
                required
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Vyberte typ skupiny" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="community">Komunita</SelectItem>
                  <SelectItem value="project">Projekt</SelectItem>
                  <SelectItem value="interest">Záujmová</SelectItem>
                  <SelectItem value="other">Iná</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Stav skupiny</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => updateFormData({ status: value as Group["status"] })}
                required
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Vyberte stav" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktívna</SelectItem>
                  <SelectItem value="inactive">Neaktívna</SelectItem>
                  <SelectItem value="pending">Čakajúca</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL obrázka skupiny (voliteľné)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="imageUrl"
                value={formData.imageUrl || ""}
                onChange={(e) => updateFormData({ imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="owner">Vlastník skupiny</Label>
              <span className="text-sm text-muted-foreground">Povinné</span>
            </div>
            <div className="space-y-4">
              <Select value={selectedOwner} onValueChange={setSelectedOwner} required>
                <SelectTrigger id="owner">
                  <SelectValue placeholder="Vyberte vlastníka skupiny" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedOwner && (
                <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/20">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={availableUsers.find((user) => user.id === selectedOwner)?.avatarUrl}
                      alt={availableUsers.find((user) => user.id === selectedOwner)?.name || ""}
                    />
                    <AvatarFallback>
                      {(availableUsers.find((user) => user.id === selectedOwner)?.name || "").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{availableUsers.find((user) => user.id === selectedOwner)?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {availableUsers.find((user) => user.id === selectedOwner)?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Členovia skupiny</Label>
              <span className="text-sm text-muted-foreground">Vybratých: {selectedMembers.length}</span>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="Vyhľadať používateľov..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead>Meno</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="w-[100px]">Rola</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className={selectedMembers.includes(user.id) ? "bg-muted/40" : ""}
                        onClick={() => toggleMember(user.id)}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(user.id)}
                            onChange={() => {}}
                            className="h-4 w-4"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell>
                          {user.id === selectedOwner ? (
                            <Badge className="bg-blue-500">Vlastník</Badge>
                          ) : selectedMembers.includes(user.id) ? (
                            <Badge variant="outline">Člen</Badge>
                          ) : (
                            <Badge variant="outline" className="opacity-50">
                              -
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Neboli nájdení žiadni používatelia.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin?tab=groups">Zrušiť</Link>
          </Button>
          <Button type="submit">{isEditing ? "Uložiť zmeny" : "Vytvoriť skupinu"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

