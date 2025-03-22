"use client"

import { useState } from "react"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function AdminHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/admin" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Admin Panel</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/admin" className="transition-colors hover:text-foreground/80">
              Prehľad
            </Link>
            <Link href="/admin?tab=members" className="transition-colors hover:text-foreground/80">
              Používatelia
            </Link>
            <Link href="/admin?tab=groups" className="transition-colors hover:text-foreground/80">
              Skupiny
            </Link>
            <Link href="/admin?tab=activities" className="transition-colors hover:text-foreground/80">
              Aktivity
            </Link>
            <Link href="/admin?tab=challenges" className="transition-colors hover:text-foreground/80">
              Výzvy
            </Link>
            <Link href="/admin?tab=rewards" className="transition-colors hover:text-foreground/80">
              Odmeny
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground/80">
              Späť na aplikáciu
            </Link>
          </nav>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Prepnúť menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" size="sm" className="ml-auto hidden md:flex">
              <Bell className="mr-2 h-4 w-4" />
              Notifikácie
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Môj účet</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nastavenia</DropdownMenuItem>
              <DropdownMenuItem>Podpora</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Odhlásiť sa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Link href="/admin" className="font-bold">
        Admin Panel
      </Link>
      <nav className="flex flex-col space-y-3">
        <Link href="/admin" className="transition-colors hover:text-foreground/80">
          Prehľad
        </Link>
        <Link href="/admin?tab=members" className="transition-colors hover:text-foreground/80">
          Používatelia
        </Link>
        <Link href="/admin?tab=groups" className="transition-colors hover:text-foreground/80">
          Skupiny
        </Link>
        <Link href="/admin?tab=activities" className="transition-colors hover:text-foreground/80">
          Aktivity
        </Link>
        <Link href="/admin?tab=challenges" className="transition-colors hover:text-foreground/80">
          Výzvy
        </Link>
        <Link href="/admin?tab=rewards" className="transition-colors hover:text-foreground/80">
          Odmeny
        </Link>
        <Link href="/" className="transition-colors hover:text-foreground/80">
          Späť na aplikáciu
        </Link>
      </nav>
    </div>
  )
}

