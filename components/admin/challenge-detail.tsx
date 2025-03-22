"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Award,
  Users,
  Camera,
  FileCheck,
  Brain,
  MapPin,
  Clock,
} from "lucide-react"
import { format } from "date-fns"
import { sk } from "date-fns/locale"
import type { Challenge, ChallengeSubmission } from "@/lib/admin-types"

// Vzorové dáta pre výzvu
const mockChallengeData: Challenge = {
  id: "chl-1",
  title: "Deň upratovania parku",
  description:
    "Pripojte sa k nám na komunitné upratovanie Mestského parku. Prineste si rukavice a pomôžte skrášliť naše mesto!",
  points: 150,
  startDate: new Date(2023, 5, 15),
  endDate: new Date(2023, 5, 16),
  status: "waiting-for-confirmation",
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
  submissions: [
    {
      id: "sub-1",
      userId: "usr-1",
      userName: "Ján Novák",
      challengeId: "chl-1",
      submittedAt: new Date(2023, 5, 16, 14, 30),
      status: "pending",
      photoUrls: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      notes: "Vyčistil som severnú časť parku pri detskom ihrisku.",
    },
    {
      id: "sub-2",
      userId: "usr-2",
      userName: "Alena Veselá",
      challengeId: "chl-1",
      submittedAt: new Date(2023, 5, 16, 15, 45),
      status: "pending",
      photoUrls: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      notes: "Vyzbierala som odpadky okolo lavičiek v strednej časti parku.",
    },
    {
      id: "sub-3",
      userId: "usr-3",
      userName: "Peter Tichý",
      challengeId: "chl-1",
      submittedAt: new Date(2023, 5, 16, 16, 20),
      status: "pending",
      photoUrls: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      notes: "Vyčistil som okolie fontány a pridľahlé chodníky.",
    },
  ],
}

// Vzorové dáta pre schválené a zamietnuté odovzdania
const mockApprovedSubmissions: ChallengeSubmission[] = [
  {
    id: "sub-4",
    userId: "usr-4",
    userName: "Martin Zelený",
    challengeId: "chl-1",
    submittedAt: new Date(2023, 5, 16, 12, 15),
    status: "approved",
    photoUrls: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    notes: "Vyčistil som južnú časť parku a vysypal všetky odpadkové koše.",
  },
]

const mockRejectedSubmissions: ChallengeSubmission[] = [
  {
    id: "sub-5",
    userId: "usr-5",
    userName: "Tomáš Vysoký",
    challengeId: "chl-1",
    submittedAt: new Date(2023, 5, 16, 18, 5),
    status: "rejected",
    photoUrls: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    notes: "Upratoval som okolie basketbalového ihriska.",
  },
]

interface ChallengeDetailProps {
  challengeId: string
}

export default function ChallengeDetail({ challengeId }: ChallengeDetailProps) {
  const router = useRouter()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [pendingSubmissions, setPendingSubmissions] = useState<ChallengeSubmission[]>([])
  const [approvedSubmissions, setApprovedSubmissions] = useState<ChallengeSubmission[]>([])
  const [rejectedSubmissions, setRejectedSubmissions] = useState<ChallengeSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<ChallengeSubmission | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  // Načítanie dát (simulácia)
  useEffect(() => {
    // V reálnej aplikácii by sme tu volali API na získanie dát
    setTimeout(() => {
      setChallenge(mockChallengeData)
      setPendingSubmissions(mockChallengeData.submissions || [])
      setApprovedSubmissions(mockApprovedSubmissions)
      setRejectedSubmissions(mockRejectedSubmissions)
    }, 500)
  }, [challengeId])

  const handleApprove = (submission: ChallengeSubmission) => {
    // V reálnej aplikácii by sme tu volali API na schválenie odovzdania
    const updatedSubmission = { ...submission, status: "approved" as const }
    setPendingSubmissions((submissions) => submissions.filter((s) => s.id !== submission.id))
    setApprovedSubmissions((submissions) => [...submissions, updatedSubmission])
    alert(`Odovzdanie používateľa ${submission.userName} bolo schválené.`)
  }

  const handleReject = () => {
    // V reálnej aplikácii by sme tu volali API na zamietnutie odovzdania
    if (!selectedSubmission) return

    const updatedSubmission = {
      ...selectedSubmission,
      status: "rejected" as const,
      notes: selectedSubmission.notes + "\n\nDôvod zamietnutia: " + rejectionReason,
    }

    setPendingSubmissions((submissions) => submissions.filter((s) => s.id !== selectedSubmission.id))
    setRejectedSubmissions((submissions) => [...submissions, updatedSubmission])

    setIsRejectDialogOpen(false)
    setRejectionReason("")
    setSelectedSubmission(null)

    alert(`Odovzdanie používateľa ${selectedSubmission.userName} bolo zamietnuté.`)
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

  const getSubmissionTypeName = (type: string) => {
    switch (type) {
      case "photo-before-after":
        return "Fotografie pred a po"
      case "photo-single":
        return "Jedna fotografia"
      case "attendance":
        return "Prezenčná listina"
      case "location-check":
        return "Kontrola lokality"
      default:
        return "Iné"
    }
  }

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Načítavam detail...</h2>
          <p className="text-muted-foreground">Prosím čakajte</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/admin?tab=challenges" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{challenge.title}</h1>
            <div className="flex items-center space-x-2 mt-1">
              {getCategoryBadge(challenge.category)}
              {getStatusBadge(challenge.status)}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center" asChild>
            <Link href={`/admin/challenges/${challengeId}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Upraviť
            </Link>
          </Button>
          <Button variant="destructive" className="flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Vymazať
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informácie o {challenge.isEvent ? "podujatí" : "výzve"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none dark:prose-invert">
              <p>{challenge.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Časové obdobie</p>
                  <p className="text-sm text-muted-foreground">
                    {format(challenge.startDate, "d. MMMM yyyy", { locale: sk })}
                    {!challenge.isEvent &&
                      challenge.startDate.getTime() !== challenge.endDate.getTime() &&
                      ` - ${format(challenge.endDate, "d. MMMM yyyy", { locale: sk })}`}
                  </p>
                  {challenge.isEvent && challenge.time && (
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {challenge.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Body</p>
                  <p className="text-sm text-muted-foreground">{challenge.points} bodov za dokončenie</p>
                </div>
              </div>

              {challenge.isEvent && challenge.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Miesto konania</p>
                    <p className="text-sm text-muted-foreground">{challenge.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Účastníci</p>
                  {challenge.isEvent && challenge.capacity ? (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {challenge.registered}/{challenge.capacity} (
                        {Math.round((challenge.registered / challenge.capacity) * 100)}% obsadené)
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{challenge.participants} prihlásených</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Kritériá splnenia</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Typ odovzdania</p>
                    <p className="text-sm text-muted-foreground">{getSubmissionTypeName(challenge.submissionType)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FileCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Stav</p>
                    <p className="text-sm">{getStatusBadge(challenge.status)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">AI overenie</p>
                    <p className="text-sm text-muted-foreground">{challenge.useAiVerification ? "Áno" : "Nie"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 flex items-center justify-center text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m2 9 3-3 3 3" />
                      <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                      <path d="m22 15-3 3-3-3" />
                      <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Kategória</p>
                    <p className="text-sm">{getCategoryBadge(challenge.category)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2">Pokyny pre účastníkov</h4>
                <p className="text-sm">{challenge.submissionCriteria}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Štatistiky dokončenia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Čakajúce na schválenie</span>
              <Badge variant="outline">{pendingSubmissions.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Schválené</span>
              <Badge className="bg-green-500">{approvedSubmissions.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Zamietnuté</span>
              <Badge className="bg-red-500">{rejectedSubmissions.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Miera schválenia</span>
              <span className="text-sm">
                {approvedSubmissions.length + rejectedSubmissions.length > 0
                  ? Math.round(
                      (approvedSubmissions.length / (approvedSubmissions.length + rejectedSubmissions.length)) * 100,
                    ) + "%"
                  : "N/A"}
              </span>
            </div>

            {challenge.isEvent && challenge.capacity && (
              <>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Obsadenosť</span>
                  <span className="text-sm">
                    {challenge.registered}/{challenge.capacity} (
                    {Math.round((challenge.registered / challenge.capacity) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((challenge.registered / challenge.capacity) * 100))}%`,
                    }}
                  ></div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Odovzdania od používateľov</CardTitle>
          <CardDescription>Skontrolujte a schváľte alebo zamietnite odovzdania od používateľov</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Čakajúce ({pendingSubmissions.length})</TabsTrigger>
              <TabsTrigger value="approved">Schválené ({approvedSubmissions.length})</TabsTrigger>
              <TabsTrigger value="rejected">Zamietnuté ({rejectedSubmissions.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4 space-y-6">
              {pendingSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p>Žiadne čakajúce odovzdania na schválenie</p>
                </div>
              ) : (
                pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{submission.userName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Odovzdané {format(submission.submittedAt, "d. MMMM yyyy HH:mm", { locale: sk })}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setSelectedSubmission(submission)
                              setIsRejectDialogOpen(true)
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Zamietnuť
                          </Button>
                          <Button className="text-white" onClick={() => handleApprove(submission)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Schváliť
                          </Button>
                        </div>
                      </div>
                    </div>
                    {submission.notes && (
                      <div className="p-4 border-b">
                        <p className="text-sm">{submission.notes}</p>
                      </div>
                    )}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submission.photoUrls.map((url, index) => (
                        <div key={index} className="space-y-2">
                          <p className="text-sm font-medium">
                            {submission.submissionType === "photo-before-after"
                              ? index === 0
                                ? "Fotografia pred"
                                : "Fotografia po"
                              : `Fotografia ${index + 1}`}
                          </p>
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Odovzdaná fotografia ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="approved" className="mt-4 space-y-6">
              {approvedSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p>Žiadne schválené odovzdania</p>
                </div>
              ) : (
                approvedSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{submission.userName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Odovzdané {format(submission.submittedAt, "d. MMMM yyyy HH:mm", { locale: sk })}
                          </p>
                        </div>
                        <Badge className="bg-green-500">Schválené</Badge>
                      </div>
                    </div>
                    {submission.notes && (
                      <div className="p-4 border-b">
                        <p className="text-sm">{submission.notes}</p>
                      </div>
                    )}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submission.photoUrls.map((url, index) => (
                        <div key={index} className="space-y-2">
                          <p className="text-sm font-medium">
                            {submission.submissionType === "photo-before-after"
                              ? index === 0
                                ? "Fotografia pred"
                                : "Fotografia po"
                              : `Fotografia ${index + 1}`}
                          </p>
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Odovzdaná fotografia ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="rejected" className="mt-4 space-y-6">
              {rejectedSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <p>Žiadne zamietnuté odovzdania</p>
                </div>
              ) : (
                rejectedSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{submission.userName}</h3>
                          <p className="text-sm text-muted-foreground">
                            Odovzdané {format(submission.submittedAt, "d. MMMM yyyy HH:mm", { locale: sk })}
                          </p>
                        </div>
                        <Badge className="bg-red-500">Zamietnuté</Badge>
                      </div>
                    </div>
                    {submission.notes && (
                      <div className="p-4 border-b">
                        <p className="text-sm whitespace-pre-line">{submission.notes}</p>
                      </div>
                    )}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {submission.photoUrls.map((url, index) => (
                        <div key={index} className="space-y-2">
                          <p className="text-sm font-medium">
                            {submission.submissionType === "photo-before-after"
                              ? index === 0
                                ? "Fotografia pred"
                                : "Fotografia po"
                              : `Fotografia ${index + 1}`}
                          </p>
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Odovzdaná fotografia ${index + 1}`}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zamietnuť odovzdanie</DialogTitle>
            <DialogDescription>
              Zadajte dôvod zamietnutia odovzdania od užívateľa {selectedSubmission?.userName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Dôvod zamietnutia..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Zrušiť
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Zamietnuť odovzdanie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
// Odstránená funkcia getTypeBadge

