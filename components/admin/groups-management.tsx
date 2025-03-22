"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Users,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { sk } from "date-fns/locale"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface GroupsManagementProps {
  limit?: number
}

export function GroupsManagement({ limit }: GroupsManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  // Vzorové dáta pre skupiny
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "grp-1",
      name: "Zelená Bystrica",
      description: "Skupina zameraná na ekologické aktivity a zlepšenie životného prostredia v meste.",
      ownerId: "usr-1",
      ownerName: "Ján Novák",
      ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
      memberCount: 24,
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
      createdAt: new Date(2023, 0, 15),
      status: "active",
      type: "community",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "grp-2",
      name: "Cyklisti Považia",
      description: "Skupina pre nadšencov cyklistiky a podporu cyklotrás v regióne.",
      ownerId: "usr-4",
      ownerName: "Martin Zelený",
      ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
      memberCount: 42,
      members: [
        {
          id: "usr-4",
          name: "Martin Zelený",
          email: "martin.zeleny@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          joinedDate: "2023-02-10",
        },
      ],
      createdAt: new Date(2023, 1, 10),
      status: "active",
      type: "interest",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "grp-3",
      name: "Revitalizácia parku",
      description: "Projektová skupina pre revitalizáciu mestského parku.",
      ownerId: "usr-5",
      ownerName: "Tomáš Vysoký",
      ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
      memberCount: 8,
      members: [
        {
          id: "usr-5",
          name: "Tomáš Vysoký",
          email: "tomas.vysoky@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          joinedDate: "2023-03-05",
        },
      ],
      createdAt: new Date(2023, 2, 5),
      status: "active",
      type: "project",
    },
    {
      id: "grp-4",
      name: "Kultúrne podujatia",
      description: "Skupina pre organizáciu a podporu kultúrnych podujatí v meste.",
      ownerId: "usr-6",
      ownerName: "Lucia Malá",
      ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
      memberCount: 15,
      members: [
        {
          id: "usr-6",
          name: "Lucia Malá",
          email: "lucia.mala@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          joinedDate: "2023-04-12",
        },
      ],
      createdAt: new Date(2023, 3, 12),
      status: "inactive",
      type: "community",
    },
    {
      id: "grp-5",
      name: "Mestské včely",
      description: "Iniciatíva pre podporu mestského včelárstva a biodiverzity.",
      ownerId: "usr-7",
      ownerName: "Karol Včelár",
      ownerAvatarUrl: "/placeholder.svg?height=40&width=40",
      memberCount: 6,
      members: [
        {
          id: "usr-7",
          name: "Karol Včelár",
          email: "karol.vcelar@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
          joinedDate: "2023-05-20",
        },
      ],
      createdAt: new Date(2023, 4, 20),
      status: "pending",
      type: "interest",
    },
  ])

  // Filtrovanie skupín podľa vyhľadávania, stavu a typu
  const filteredGroups = groups
    .filter(
      (group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.ownerName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((group) => statusFilter === "all" || group.status === statusFilter)
    .filter((group) => typeFilter === "all" || group.type === typeFilter)

  // Obmedzenie počtu skupín, ak je zadaný limit
  const displayedGroups = limit ? filteredGroups.slice(0, limit) : filteredGroups

  const handleDeleteGroup = () => {
    if (!selectedGroup) return

    const updatedGroups = groups.filter((group) => group.id !== selectedGroup.id)

    setGroups(updatedGroups)
    setSelectedGroup(null)
    setIsDeleteDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktívna</Badge>
      case "inactive":
        return <Badge variant="outline">Neaktívna</Badge>
      case "pending":
        return <Badge className="bg-amber-500">Čakajúca</Badge>
      default:
        return <Badge>Neznáma</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "community":
        return <Badge className="bg-blue-500">Komunita</Badge>
      case "project":
        return <Badge className="bg-purple-500">Projekt</Badge>
      case "interest":
        return <Badge className="bg-emerald-500">Záujmová</Badge>
      default:
        return <Badge>Iná</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhľadať skupiny..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter podľa stavu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="active">Aktívne</SelectItem>
                <SelectItem value="inactive">Neaktívne</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter podľa typu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky typy</SelectItem>
                <SelectItem value="community">Komunita</SelectItem>
                <SelectItem value="project">Projekt</SelectItem>
                <SelectItem value="interest">Záujmová</SelectItem>
                <SelectItem value="other">Iné</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/admin/groups/new">
                <Plus className="mr-2 h-4 w-4" />
                Pridať skupinu
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Názov skupiny</TableHead>
              <TableHead className="hidden md:table-cell">Typ</TableHead>
              <TableHead>Vlastník</TableHead>
              <TableHead className="hidden md:table-cell">Členovia</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead className="hidden md:table-cell">Vytvorená</TableHead>
              <TableHead className="w-[70px]">Akcie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedGroups.length > 0 ? (
              displayedGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {group.imageUrl ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={group.imageUrl} alt={group.name} />
                          <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <Users className="h-4 w-4" />
                        </div>
                      )}
                      <span>{group.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{getTypeBadge(group.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={group.ownerAvatarUrl} alt={group.ownerName} />
                        <AvatarFallback>{group.ownerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{group.ownerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{group.memberCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(group.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{format(group.createdAt, "d. M. yyyy", { locale: sk })}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Otvoriť menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akcie</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedGroup(group)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Zobraziť detail
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/groups/${group.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Upraviť
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedGroup(group)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Vymazať
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Neboli nájdené žiadne skupiny.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Zobrazuje sa <strong>1</strong> až <strong>{displayedGroups.length}</strong> z{" "}
            <strong>{filteredGroups.length}</strong> skupín
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * 10 >= filteredGroups.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialóg pre zobrazenie detailu skupiny */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedGroup && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {selectedGroup.imageUrl ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedGroup.imageUrl} alt={selectedGroup.name} />
                      <AvatarFallback>{selectedGroup.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Users className="h-4 w-4" />
                    </div>
                  )}
                  <span>{selectedGroup.name}</span>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getTypeBadge(selectedGroup.type)}
                    {getStatusBadge(selectedGroup.status)}
                    <Badge variant="outline" className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      Vytvorená {format(selectedGroup.createdAt, "d. MMMM yyyy", { locale: sk })}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Popis</h4>
                <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Vlastník</h4>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedGroup.ownerAvatarUrl} alt={selectedGroup.ownerName} />
                    <AvatarFallback>{selectedGroup.ownerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedGroup.ownerName}</p>
                    <p className="text-xs text-muted-foreground">Vlastník skupiny</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="members" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="members">Členovia ({selectedGroup.memberCount})</TabsTrigger>
                  <TabsTrigger value="activities">Aktivity</TabsTrigger>
                </TabsList>
                <TabsContent value="members" className="mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Meno</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Pripojený</TableHead>
                          <TableHead>Rola</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedGroup.members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{member.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{member.email}</TableCell>
                            <TableCell className="text-sm">{member.joinedDate}</TableCell>
                            <TableCell>
                              {member.id === selectedGroup.ownerId ? (
                                <Badge className="bg-blue-500">Vlastník</Badge>
                              ) : (
                                <Badge variant="outline">Člen</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="activities" className="mt-4">
                  <div className="flex items-center justify-center h-40 border rounded-md">
                    <p className="text-muted-foreground">Žiadne nedávne aktivity</p>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Zavrieť
                </Button>
                <Button asChild>
                  <Link href={`/admin/groups/${selectedGroup.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Upraviť skupinu
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialóg pre vymazanie skupiny */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ste si istí?</AlertDialogTitle>
            <AlertDialogDescription>
              Táto akcia sa nedá vrátiť späť. Natrvalo sa vymaže skupina
              {selectedGroup && ` "${selectedGroup.name}"`} a všetky jej dáta z našich serverov.
              {selectedGroup && selectedGroup.memberCount > 0 && (
                <span className="block mt-2 font-medium">
                  Táto skupina má {selectedGroup.memberCount} členov, ktorí stratia prístup.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušiť</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGroup} className="bg-red-600">
              Vymazať
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

