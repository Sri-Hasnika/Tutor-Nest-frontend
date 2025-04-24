"use client"

import type React from "react"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { DashboardNav } from "./dashboard-nav"
import { useEffect, useState } from "react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [curUser, setCurUser] = useState<any>();
  const [home,setHome] = useState<any>("/");
  
    const getCurUser=()=>{
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) return;
      setCurUser(user);
      const role = localStorage.getItem("role")||"tutee";
      setHome(role === "tutor" ? "/dashboard/tutor/profile" : "/dashboard");
    }
    useEffect(()=>{
      getCurUser();
    },[])
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            
            <Link href={`${home}`} className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduConnect</span>
            </Link>

          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard/notifications" className="relative">
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="sr-only">Notifications</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-2">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" src="/placeholder.svg?height=32&width=32" alt="User" />
              </span>
              <span className="hidden md:block">{curUser?.firstName + " " + curUser?.lastName}</span>
            </Link>
          </nav>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          <div className="grid gap-6">{children}</div>
        </main>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">EduConnect</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 EduConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

