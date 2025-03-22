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
  MapPin,
  Clock,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { sk } from "date-fns/locale"
import Link from "next/link"
import type { Challenge } from "@/lib/admin-types"

interface ChallengesManagementProps {
  limit?: number
}

export function ChallengesManagement({ limit }: ChallengesManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  // Vzorové dáta pre výzvy a podujatia
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "chl-1",
      title: "Deň upratovania parku",
      description:
        "Pripojte sa k nám na komunitné upratovanie Mestského parku. Prineste si rukavice a pomôžte skrášliť naše mesto!",
      points: 150,
      startDate: new Date(2023, 5, 15),
      endDate: new Date(2023, 5, 16),
      status: "active",
      category: "environment",
      participants: 45,
      submissionType: "photo-before-after",
      submissionCriteria: "Odfoťte znečistenú plochu pred upratovaním a tú istú plochu po upratovaní.",
      useAiVerification: true,
      isEvent: true,
      location: "Mestský park, hlavný vchod",
      time: "09:00",
      capacity: 100,
      registered: 45,
    },
    {
      id: "chl-2",
      title: "Týždeň bicyklovania do práce",
      description:
        "Znížte svoju uhlíkovú stopu bicyklovaním do práce počas celého týždňa. Sledujte svoje kilometre pre bonusové body!",
      points: 200,
      startDate: new Date(2023, 6, 1),
      endDate: new Date(2023, 6, 7),
      status: "upcoming",
      category: "transportation",
      participants: 28,
      submissionType: "photo-single",
      submissionCriteria: "Odfoťte sa s bicyklom pred pracoviskom aspoň 3 rôzne dni v týždni.",
      useAiVerification: false,
      isEvent: false,
    },
    {
      id: "chl-3",
      title: "Výzva na podporu lokálnych podnikov",
      description: "Navštívte a nakúpte v 5 rôznych lokálnych podnikoch tento mesiac. Predložte účtenky ako dôkaz.",
      points: 250,
      startDate: new Date(2023, 4, 1),
      endDate: new Date(2023, 4, 30),
      status: "completed",
      category: "economy",
      participants: 132,
      submissionType: "photo-single",
      submissionCriteria: "Nahrajte fotografiu účtenky z každého navštíveného lokálneho podniku.",
      useAiVerification: false,
      isEvent: false,
    },
    {
      id: "chl-4",
      title: "Dobrovoľnícky deň v komunitnej záhrade",
      description:
        "Pomôžte vysádzať a udržiavať komunitnú záhradu. Nie sú potrebné žiadne skúsenosti, náradie je zabezpečené!",
      points: 100,
      startDate: new Date(2023, 7, 12),
      endDate: new Date(2023, 7, 12),
      status: "upcoming",
      category: "environment",
      participants: 15,
      submissionType: "attendance",
      submissionCriteria: "Zúčastnite sa na podujatí a zapíšte sa do prezenčnej listiny.",
      useAiVerification: false,
      isEvent: true,
      location: "Komunitná záhrada, Zelená ulica 5",
      time: "14:00",
      capacity: 30,
      registered: 15,
    },
    {
      id: "chl-5",
      title: "Technická pomoc seniorom",
      description:
        "Dobrovoľníčte a pomôžte seniorom naučiť sa používať technológie. Ideálne pre technicky zdatných občanov!",
      points: 175,
      startDate: new Date(2023, 5, 20),
      endDate: new Date(2023, 5, 20),
      status: "waiting-for-confirmation",
      category: "education",
      participants: 8,
      submissionType: "photo-single",
      submissionCriteria: "Nahrajte fotografiu prezenčnej listiny alebo potvrdenie od seniorského centra.",
      useAiVerification: true,
      isEvent: true,
      location: "Seniorské centrum, Hlavná 28",
      time: "10:00",
      capacity: 20,
      registered: 8,
    },
    {
      id: "chl-6",
      title: "Mestský maratón",
      description: "Zúčastnite sa mestského maratónu a podporte zdravý životný štýl.",
      points: 300,
      startDate: new Date(2023, 8, 10),
      endDate: new Date(2023, 8, 10),
      status: "upcoming",
      category: "sports",
      participants: 120,
      submissionType: "attendance",
      submissionCriteria: "Registrujte sa a dokončite maratón.",
      useAiVerification: false,
      isEvent: true,
      location: "Námestie slobody, štartová čiara",
      time: "08:00",
      capacity: 500,
      registered: 120,
    },
    {
      id: "chl-7",
      title: "Recyklácia elektronického odpadu",
      description: "Prineste starú elektroniku na recykláciu a získajte body za ekologické správanie.",
      points: 75,
      startDate: new Date(2023, 6, 15),
      endDate: new Date(2023, 6, 30),
      status: "active",
      category: "environment",
      participants: 35,
      submissionType: "photo-single",
      submissionCriteria: "Odfoťte sa pri odovzdávaní elektronického odpadu v zbernom dvore.",
      useAiVerification: true,
      isEvent: false,
    },
  ])

  // Filtrovanie výziev podľa vyhľadávania, stavu, kategórie a typu
  const filteredChallenges = challenges
    .filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (challenge.location && challenge.location.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .filter((challenge) => statusFilter === "all" || challenge.status === statusFilter)
    .filter((challenge) => categoryFilter === "all" || challenge.category === categoryFilter)

  // Obmedzenie počtu výziev, ak je zadaný limit
  const displayedChallenges = limit ? filteredChallenges.slice(0, limit) : filteredChallenges

  const handleDeleteChallenge = () => {
    if (!selectedChallenge) return

    const updatedChallenges = challenges.filter((challenge) => challenge.id !== selectedChallenge.id)

    setChallenges(updatedChallenges)
    setSelectedChallenge(null)
    setIsDeleteDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktívna</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500">Pripravovaná</Badge>
      case "completed":
        return <Badge variant="outline">Ukončená</Badge>
      case "draft":
        return <Badge variant="secondary">Koncept</Badge>
      case "waiting-for-confirmation":
        return <Badge className="bg-amber-500">Čaká na potvrdenie</Badge>
      default:
        return <Badge>Neznáma</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "environment":
        return <Badge className="bg-emerald-500">Životné prostredie</Badge>
      case "transportation":
        return <Badge className="bg-amber-500">Doprava</Badge>
      case "education":
        return <Badge className="bg-indigo-500">Vzdelávanie</Badge>
      case "economy":
        return <Badge className="bg-purple-500">Ekonomika</Badge>
      case "culture":
        return <Badge className="bg-pink-500">Kultúra</Badge>
      case "sports":
        return <Badge className="bg-orange-500">Šport</Badge>
      case "community":
        return <Badge className="bg-teal-500">Komunita</Badge>
      default:
        return <Badge>Iné</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Vyhľadať výzvy a podujatia..."
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
                <SelectItem value="upcoming">Pripravované</SelectItem>
                <SelectItem value="completed">Ukončené</SelectItem>
                <SelectItem value="draft">Koncepty</SelectItem>
                <SelectItem value="waiting-for-confirmation">Čaká na potvrdenie</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter podľa kategórie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky kategórie</SelectItem>
                <SelectItem value="environment">Životné prostredie</SelectItem>
                <SelectItem value="transportation">Doprava</SelectItem>
                <SelectItem value="education">Vzdelávanie</SelectItem>
                <SelectItem value="economy">Ekonomika</SelectItem>
                <SelectItem value="culture">Kultúra</SelectItem>
                <SelectItem value="sports">Šport</SelectItem>
                <SelectItem value="community">Komunita</SelectItem>
                <SelectItem value="other">Iné</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/admin/challenges/new">
                <Plus className="mr-2 h-4 w-4" />
                Pridať výzvu
              </Link>
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Názov</TableHead>
              <TableHead className="hidden md:table-cell">Kategória</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead className="hidden md:table-cell">Body</TableHead>
              <TableHead>Časové obdobie</TableHead>
              <TableHead className="hidden md:table-cell">Miesto</TableHead>
              <TableHead className="hidden md:table-cell">Účastníci</TableHead>
              <TableHead className="w-[70px]">Akcie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedChallenges.length > 0 ? (
              displayedChallenges.map((challenge) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">{challenge.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{getCategoryBadge(challenge.category)}</TableCell>
                  <TableCell>{getStatusBadge(challenge.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{challenge.points}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {format(challenge.startDate, "d. M. yyyy", { locale: sk })}
                          {!challenge.isEvent &&
                            challenge.startDate.getTime() !== challenge.endDate.getTime() &&
                            ` - ${format(challenge.endDate, "d. M. yyyy", { locale: sk })}`}
                        </span>
                      </div>
                      {challenge.isEvent && challenge.time && (
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{challenge.time}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {challenge.location ? (
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{challenge.location}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {challenge.isEvent && challenge.capacity ? (
                      <div className="flex flex-col">
                        <span>
                          {challenge.registered}/{challenge.capacity}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {Math.round((challenge.registered / challenge.capacity) * 100)}% obsadené
                        </span>
                      </div>
                    ) : (
                      <span>{challenge.participants}</span>
                    )}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/challenges/${challenge.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Zobraziť detail
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/challenges/${challenge.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Upraviť
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedChallenge(challenge)
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
                <TableCell colSpan={9} className="h-24 text-center">
                  Neboli nájdené žiadne výzvy ani podujatia.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Zobrazuje sa <strong>1</strong> až <strong>{displayedChallenges.length}</strong> z{" "}
            <strong>{filteredChallenges.length}</strong> výziev a podujatí
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
              disabled={currentPage * 10 >= filteredChallenges.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialóg pre vymazanie výzvy */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ste si istí?</AlertDialogTitle>
            <AlertDialogDescription>
              Táto akcia sa nedá vrátiť späť. Natrvalo sa vymaže
              {selectedChallenge?.isEvent ? " podujatie" : " výzva"}
              {selectedChallenge && ` "${selectedChallenge.title}"`} a odstráni sa z našich serverov.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušiť</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteChallenge} className="bg-red-600">
              Vymazať
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

