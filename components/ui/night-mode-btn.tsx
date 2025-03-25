"use client"

import * as React from "react"
import { useTheme } from "next-themes"
// import moon et sun withhout ssr to avoid hydration mismatch
const Moon = dynamic(() => import("lucide-react").then((mod) => mod.Moon), {
  ssr: false,
})
const Sun = dynamic(() => import("lucide-react").then((mod) => mod.Sun), {
  ssr: false,
})
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dynamic from "next/dynamic"

export function NightModeBtn() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
        
            {
                theme === "light" ? <Sun size={24} /> : <Moon size={24} />
            }
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
