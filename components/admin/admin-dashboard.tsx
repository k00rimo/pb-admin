"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityMonitor } from "@/components/admin/activity-monitor";
import { MemberManagement } from "@/components/admin/member-management";
import { ChallengesManagement } from "@/components/admin/challenges-management";
import { RewardsManagement } from "@/components/admin/rewards-management";
import { GroupsManagement } from "@/components/admin/groups-management";
import { StatisticsPanel } from "@/components/admin/statistics-panel";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (
      tabParam &&
      [
        "overview",
        "members",
        "activities",
        "challenges",
        "rewards",
        "groups",
      ].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdminHeader />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Administrátorský panel
          </h1>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-6 lg:w-auto">
            <TabsTrigger value="overview">Prehľad</TabsTrigger>
            <TabsTrigger value="members">Používatelia</TabsTrigger>
            <TabsTrigger value="groups">Skupiny</TabsTrigger>
            <TabsTrigger value="activities">Aktivita</TabsTrigger>
            <TabsTrigger value="challenges">Výzvy</TabsTrigger>
            <TabsTrigger value="rewards">Odmeny</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Celkový počet používateľov
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">
                    +14% oproti minulému mesiacu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aktívne skupiny
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">
                    +3 oproti minulému mesiacu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Aktívne výzvy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    +2 oproti minulému týždňu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dostupné odmeny
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +3 oproti minulému mesiacu
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Nedávne aktivity</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ActivityMonitor limit={5} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Noví používatelia</CardTitle>
                </CardHeader>
                <CardContent>
                  <MemberManagement limit={5} viewOnly />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Aktuálne výzvy</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChallengesManagement limit={3} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Aktívne skupiny</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <GroupsManagement limit={3} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Dostupné odmeny</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <RewardsManagement limit={3} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Štatistiky</CardTitle>
                <CardDescription>
                  Prehľad kľúčových metrík a trendov
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <StatisticsPanel />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Správa používateľov</CardTitle>
                <CardDescription>
                  Pridávanie, úprava alebo odstránenie používateľov
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <MemberManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Správa skupín</CardTitle>
                <CardDescription>
                  Vytváranie a správa skupín používateľov
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <GroupsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monitorovanie aktivít</CardTitle>
                <CardDescription>
                  Sledovanie všetkých aktivít v systéme
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ActivityMonitor />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Správa výziev</CardTitle>
                <CardDescription>
                  Vytváranie a správa výziev pre občiansku participáciu
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChallengesManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Správa odmien</CardTitle>
                <CardDescription>
                  Vytváranie a správa odmien za body pre používateľov
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RewardsManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
