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
  Award,
  Calendar,
  User,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { sk } from "date-fns/locale"
import Link from "next/link"

interface Reward {
  id: string
  title: string
  description: string
  pointsCost: number
  isIndividualClaimable: boolean
  quantity: number
  remainingQuantity: number
  startDate: Date
  endDate: Date | null
  imageUrl?: string
  category: string
  status: "active" | "draft" | "expired" | "out-of-stock"
  restrictions?: string
}

interface RewardsManagementProps {
  limit?: number
}

export function RewardsManagement({ limit }: RewardsManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)

  // Vzorové dáta pre odmeny
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "rwd-1",
      title: "Mestské tričko",
      description: "Originálne tričko s logom mesta Považská Bystrica.",
      pointsCost: 500,
      isIndividualClaimable: true,
      quantity: 50,
      remainingQuantity: 42,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 11, 31),
      imageUrl: "/placeholder.svg?height=100&width=100",
      category: "merchandise",
      status: "active",
    },
    {
      id: "rwd-2",
      title: "Vstup na mestský festival",
      description: "Voľný vstup na mestský kultúrny festival pre jednu osobu.",
      pointsCost: 300,
      isIndividualClaimable: true,
      quantity: 100,
      remainingQuantity: 65,
      startDate: new Date(2023, 6, 1),
      endDate: new Date(2023, 7, 15),
      category: "experience",
      status: "active",
    },
    {
      id: "rwd-3",
      title: "Komunitná záhrada",
      description: "Financovanie komunitnej záhrady v konkrétnej mestskej časti.",
      pointsCost: 5000,
      isIndividualClaimable: false,
      quantity: 3,
      remainingQuantity: 2,
      startDate: new Date(2023, 4, 1),
      endDate: null,
      category: "service",
      status: "active",
      restrictions: "Len pre organizované skupiny občanov s minimálne 10 členmi.",
    },
    {
      id: "rwd-4",
      title: "Zľava na mestskú dopravu",
      description: "50% zľava na mesačný lístok mestskej hromadnej dopravy.",
      pointsCost: 200,
      isIndividualClaimable: true,
      quantity: 200,
      remainingQuantity: 0,
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 5, 30),
      category: "discount",
      status: "out-of-stock",
    },
    {
      id: "rwd-5",
      title: "Mestský batoh",
      description: "Praktický batoh s motívom mesta.",
      pointsCost: 800,
      isIndividualClaimable: true,
      quantity: 30,
      remainingQuantity: 12,
      startDate: new Date(2023, 7, 1),
      endDate: null,
      imageUrl: "/placeholder.svg?height=100&width=100",
      category: "merchandise",
      status: "active",
    },
  ])

  // Filtrovanie odmien podľa vyhľadávania, stavu a kategórie
  const filteredRewards = rewards
    .filter(
      (reward) =>
        reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((reward) => statusFilter === "all" || reward.status === statusFilter)
    .filter((reward) => categoryFilter === "all" || reward.category === categoryFilter)

  // Obmedzenie počtu odmien, ak je zadaný limit
  const displayedRewards = limit ? filteredRewards.slice(0, limit) : filteredRewards

  const handleDeleteReward = () => {
    if (!selectedReward) return

    const updatedRewards = rewards.filter((reward) => reward.id !== selectedReward.id)

    setRewards(updatedRewards)
    setSelectedReward(null)
    setIsDeleteDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktívna</Badge>
      case "draft":
        return <Badge variant="secondary">Koncept</Badge>
      case "expired":
        return <Badge variant="outline">Exspirovaná</Badge>
      case "out-of-stock":
        return <Badge className="bg-red-500">Vypredaná</Badge>
      default:
        return <Badge>Neznáma</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "merchandise":
        return <Badge className="bg-blue-500">Merchandise</Badge>
      case "experience":
        return <Badge className="bg-purple-500">Zážitok</Badge>
      case "service":
        return <Badge className="bg-emerald-500">Služba</Badge>
      case "discount":
        return <Badge className="bg-amber-500">Zľava</Badge>
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
              placeholder="Vyhľadať odmeny..."
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
                <SelectItem value="draft">Koncepty</SelectItem>
                <SelectItem value="expired">Exspirované</SelectItem>
                <SelectItem value="out-of-stock">Vypredané</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter podľa kategórie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky kategórie</SelectItem>
                <SelectItem value="merchandise">Merchandise</SelectItem>
                <SelectItem value="experience">Zážitok</SelectItem>
                <SelectItem value="service">Služba</SelectItem>
                <SelectItem value="discount">Zľava</SelectItem>
                <SelectItem value="other">Iné</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/admin/rewards/new">
                <Plus className="mr-2 h-4 w-4" />
                Pridať odmenu
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
              <TableHead>Body</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead className="hidden md:table-cell">Dostupnosť</TableHead>
              <TableHead className="hidden md:table-cell">Pre koho</TableHead>
              <TableHead className="w-[70px]">Akcie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedRewards.length > 0 ? (
              displayedRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {reward.imageUrl && (
                        <img
                          src={reward.imageUrl || "/placeholder.svg"}
                          alt={reward.title}
                          className="h-8 w-8 rounded-md object-cover"
                        />
                      )}
                      <span>{reward.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{getCategoryBadge(reward.category)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Award className="mr-1 h-4 w-4 text-amber-500" />
                      <span>{reward.pointsCost}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(reward.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {format(reward.startDate, "d. M. yyyy", { locale: sk })}
                          {reward.endDate && ` - ${format(reward.endDate, "d. M. yyyy", { locale: sk })}`}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {reward.quantity === 0
                          ? "Neobmedzené množstvo"
                          : `${reward.remainingQuantity}/${reward.quantity} dostupných`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {reward.isIndividualClaimable ? (
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Jednotlivci</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Skupiny</span>
                      </div>
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
                          <Link href={`/admin/rewards/${reward.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Zobraziť detail
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/rewards/${reward.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Upraviť
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedReward(reward)
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
                  Neboli nájdené žiadne odmeny.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!limit && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Zobrazuje sa <strong>1</strong> až <strong>{displayedRewards.length}</strong> z{" "}
            <strong>{filteredRewards.length}</strong> odmien
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
              disabled={currentPage * 10 >= filteredRewards.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Dialóg pre vymazanie odmeny */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ste si istí?</AlertDialogTitle>
            <AlertDialogDescription>
              Táto akcia sa nedá vrátiť späť. Natrvalo sa vymaže odmena
              {selectedReward && ` "${selectedReward.title}"`} a odstráni sa z našich serverov.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušiť</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReward} className="bg-red-600">
              Vymazať
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

