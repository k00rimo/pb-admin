"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import { format } from "date-fns"
import { sk } from "date-fns/locale"
import type { Challenge } from "@/lib/admin-types"
import Link from "next/link"

interface ChallengeFormProps {
  challenge?: Challenge
  isEditing?: boolean
}

export default function ChallengeForm({ challenge, isEditing = false }: ChallengeFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<Challenge>>(
    challenge || {
      title: "",
      description: "",
      points: 100,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "draft",
      category: "environment",
      participants: 0,
      submissionType: "photo-single",
      submissionCriteria: "",
      useAiVerification: false,
      isEvent: false,
      location: "",
      capacity: 50,
      registered: 0,
      time: "18:00",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // V reálnej aplikácii by sme tu mali volanie API
    console.log("Odosielam formulár:", formData)

    // Simulácia úspešného odoslania
    alert(isEditing ? "Výzva bola úspešne aktualizovaná" : "Výzva bola úspešne vytvorená")

    // Presmerovanie späť na stránku správy výziev
    router.push("/admin?tab=challenges")
  }

  const updateFormData = (fields: Partial<Challenge>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <CardHeader>
          <Link
            href="/admin?tab=challenges"
            className="flex items-center text-sm text-muted-foreground mb-2 hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Späť na zoznam výziev
          </Link>
          <CardTitle>{isEditing ? "Upraviť výzvu" : "Nová výzva"}</CardTitle>
          <CardDescription>
            {isEditing
              ? "Upravte informácie o existujúcej výzve"
              : "Vyplňte formulár na vytvorenie novej výzvy pre občiansku participáciu"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="isEvent"
              checked={formData.isEvent}
              onCheckedChange={(checked) => updateFormData({ isEvent: checked })}
            />
            <Label htmlFor="isEvent">Toto je podujatie s konkrétnym miestom konania</Label>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Názov {formData.isEvent ? "podujatia" : "výzvy"}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder={`Zadajte názov ${formData.isEvent ? "podujatia" : "výzvy"}`}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis {formData.isEvent ? "podujatia" : "výzvy"}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder={`Podrobný popis ${formData.isEvent ? "podujatia" : "výzvy"} a pokyny pre účastníkov`}
                rows={5}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Kategória</Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Vyberte kategóriu" />
                </SelectTrigger>
                <SelectContent>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">Počet bodov</Label>
              <Input
                id="points"
                type="number"
                min={1}
                max={1000}
                value={formData.points}
                onChange={(e) => updateFormData({ points: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Dátum začiatku</Label>
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
              <Label htmlFor="endDate">Dátum konca</Label>
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
                    selected={formData.endDate}
                    onSelect={(date) => date && updateFormData({ endDate: date })}
                    initialFocus
                    locale={sk}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {formData.isEvent && (
            <div className="space-y-6 border rounded-lg p-4 bg-muted/20">
              <h3 className="text-lg font-medium">Detaily podujatia</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="time">Čas konania</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => updateFormData({ time: e.target.value })}
                      required={formData.isEvent}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Kapacita</Label>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="capacity"
                      type="number"
                      min={1}
                      value={formData.capacity}
                      onChange={(e) => updateFormData({ capacity: Number(e.target.value) })}
                      required={formData.isEvent}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Miesto konania</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData({ location: e.target.value })}
                    placeholder="Zadajte adresu alebo miesto konania"
                    required={formData.isEvent}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label htmlFor="status">Stav {formData.isEvent ? "podujatia" : "výzvy"}</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateFormData({ status: value as Challenge["status"] })}
              required
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Vyberte stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Koncept</SelectItem>
                <SelectItem value="upcoming">Pripravovaná</SelectItem>
                <SelectItem value="active">Aktívna</SelectItem>
                <SelectItem value="completed">Ukončená</SelectItem>
                <SelectItem value="waiting-for-confirmation">Čaká na potvrdenie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Typ odovzdania</Label>
            <RadioGroup
              value={formData.submissionType}
              onValueChange={(value) => updateFormData({ submissionType: value as Challenge["submissionType"] })}
              className="space-y-2"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="photo-before-after" id="photo-before-after" />
                <Label htmlFor="photo-before-after" className="font-normal cursor-pointer">
                  Fotografie pred a po
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Používatelia musia odovzdať fotografie pred a po vykonaní výzvy
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="photo-single" id="photo-single" />
                <Label htmlFor="photo-single" className="font-normal cursor-pointer">
                  Jedna fotografia
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Používateľ odovzdá jednu fotografiu ako dôkaz dokončenia výzvy
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="attendance" id="attendance" />
                <Label htmlFor="attendance" className="font-normal cursor-pointer">
                  Prezenčná listina
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Účasť na podujatí bude overená prezenčnou listinou
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="location-check" id="location-check" />
                <Label htmlFor="location-check" className="font-normal cursor-pointer">
                  Kontrola lokality
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Aplikácia overí, či sa používateľ nachádza na určenom mieste
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal cursor-pointer">
                  Iné
                  <p className="text-sm text-muted-foreground mt-0.5">Vlastné kritériá pre odovzdanie výzvy</p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="submissionCriteria">Kritériá odovzdania</Label>
            <Textarea
              id="submissionCriteria"
              value={formData.submissionCriteria}
              onChange={(e) => updateFormData({ submissionCriteria: e.target.value })}
              placeholder="Podrobné pokyny pre účastníkov o tom, čo je potrebné odovzdať"
              rows={3}
              required
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="useAiVerification"
              checked={formData.useAiVerification}
              onCheckedChange={(checked) => updateFormData({ useAiVerification: checked as boolean })}
            />
            <div className="space-y-1 leading-none">
              <Label htmlFor="useAiVerification" className="font-normal cursor-pointer">
                Použiť AI pre overenie fotografií
              </Label>
              <p className="text-sm text-muted-foreground">
                Umožnite systému automaticky overovať fotografie pomocou umelej inteligencie
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/admin?tab=challenges">Zrušiť</Link>
          </Button>
          <Button type="submit">{isEditing ? "Uložiť zmeny" : "Vytvoriť výzvu"}</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

