"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ArrowLeft, Award, ShoppingBag } from "lucide-react"
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

interface RewardFormProps {
  reward?: Reward
  isEditing?: boolean
}

export default function RewardForm({ reward, isEditing = false }: RewardFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Reward>>(
    reward || {
      title: "",
      description: "",
      pointsCost: 100,
      isIndividualClaimable: true,
      quantity: 10,
      remainingQuantity: 10,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 dní od teraz
      category: "merchandise",
      status: "draft",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // V reálnej aplikácii by sme tu mali volanie API
    console.log("Odosielam formulár:", formData)

    // Simulácia úspešného odoslania
    alert(isEditing ? "Odmena bola úspešne aktualizovaná" : "Odmena bola úspešne vytvorená")

    // Presmerovanie späť na stránku správy odmien
    router.push("/admin?tab=rewards")
  }

  const updateFormData = (fields: Partial<Reward>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <CardHeader>
          <Link
            href="/admin?tab=rewards"
            className="flex items-center text-sm text-muted-foreground mb-2 hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Späť na zoznam odmien
          </Link>
          <CardTitle>{isEditing ? "Upraviť odmenu" : "Nová odmena"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Upravte informácie o existujúcej odmene"
              : "Vyplňte formulár na vytvorenie novej odmeny za body"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Názov odmeny</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder="Zadajte názov odmeny"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis odmeny</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Podrobný popis odmeny a jej hodnoty pre používateľov"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pointsCost">Cena v bodoch</Label>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="pointsCost"
                  type="number"
                  min={1}
                  value={formData.pointsCost}
                  onChange={(e) => updateFormData({ pointsCost: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategória</Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Vyberte kategóriu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merchandise">Merchandise</SelectItem>
                  <SelectItem value="experience">Zážitok</SelectItem>
                  <SelectItem value="service">Služba</SelectItem>
                  <SelectItem value="discount">Zľava</SelectItem>
                  <SelectItem value="other">Iné</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Dátum začiatku dostupnosti</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" id="startDate">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? (
                      format(formData.startDate, "PPP", { locale: sk })
                    ) : (
                      <span>Vyberte dátum</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => date && updateFormData({ startDate: date })}
                    initialFocus
                    locale={sk}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Dátum konca dostupnosti (voliteľné)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" id="endDate">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP", { locale: sk }) : <span>Vyberte dátum</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate || undefined}
                    onSelect={(date) => updateFormData({ endDate: date })}
                    initialFocus
                    locale={sk}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="quantity">Celkové množstvo</Label>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  value={formData.quantity}
                  onChange={(e) =>
                    updateFormData({
                      quantity: Number(e.target.value),
                      remainingQuantity: isEditing
                        ? Math.min(formData.remainingQuantity || 0, Number(e.target.value))
                        : Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Zadajte 0 pre neobmedzené množstvo</p>
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="remainingQuantity">Zostávajúce množstvo</Label>
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="remainingQuantity"
                    type="number"
                    min={0}
                    max={formData.quantity}
                    value={formData.remainingQuantity}
                    onChange={(e) =>
                      updateFormData({
                        remainingQuantity: Math.min(Number(e.target.value), formData.quantity || 0),
                      })
                    }
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="status">Stav odmeny</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateFormData({ status: value as Reward["status"] })}
              required
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Vyberte stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Koncept</SelectItem>
                <SelectItem value="active">Aktívna</SelectItem>
                <SelectItem value="expired">Exspirovaná</SelectItem>
                <SelectItem value="out-of-stock">Vypredaná</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL obrázka (voliteľné)</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl || ""}
              onChange={(e) => updateFormData({ imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restrictions">Obmedzenia a podmienky (voliteľné)</Label>
            <Textarea
              id="restrictions"
              value={formData.restrictions || ""}
              onChange={(e) => updateFormData({ restrictions: e.target.value })}
              placeholder="Zadajte akékoľvek obmedzenia alebo podmienky pre získanie odmeny"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch
              id="isIndividualClaimable"
              checked={formData.isIndividualClaimable}
              onCheckedChange={(checked) => updateFormData({ isIndividualClaimable: checked })}
            />
            <div className="space-y-1">
              <Label htmlFor="isIndividualClaimable" className="font-medium">
                Nárokovateľné jednotlivcom
              </Label>
              <p className="text-sm text-muted-foreground">
                Ak je zapnuté, odmenu si môže nárokovať jednotlivec. Ak je vypnuté, odmena je určená pre skupiny alebo
                komunity.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin?tab=rewards">Zrušiť</Link>
          </Button>
          <Button type="submit">{isEditing ? "Uložiť zmeny" : "Vytvoriť odmenu"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

